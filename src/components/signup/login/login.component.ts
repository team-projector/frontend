import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponent, UI } from '@junte/ui';
import 'reflect-metadata';
import { of } from 'rxjs';
import { delay, filter, finalize, map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { AppConfig } from 'src/app-config';
import { APPLICATION_READY, BACKEND, MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/models/access-token';
import { UserRole } from 'src/models/enums/user';
import { BackendError } from 'src/types/gql-errors';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { getMock } from '@junte/mocker';
import { LocalUI } from 'src/enums/local-ui';
import { GitlabLoginGQL, LoginGQL } from './login.graphql';

enum SystemMode {
  mocks = 'mocks',
  demo = 'demo',
  prod = 'prod'
}

const COMMON_DEMO_PASS = 'LKnLPUJyGPKXAag4';

const DEMO_USERS = {
  [UserRole.developer]: {login: 'tp.developer', password: COMMON_DEMO_PASS},
  [UserRole.leader]: {login: 'tp.leader', password: COMMON_DEMO_PASS},
  [UserRole.manager]: {login: 'tp.manager', password: COMMON_DEMO_PASS},
  [UserRole.shareholder]: {login: 'shareholder', password: COMMON_DEMO_PASS}
};

enum Themes {
  light = 'light',
  dark = 'dark'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui = UI;
  userRole = UserRole;
  localUi = LocalUI;
  systemMode = SystemMode;
  backend = BACKEND;

  mode = environment.mocks ? SystemMode.mocks : (BACKEND.config.demoMode ? SystemMode.demo : SystemMode.prod);
  theme = !!localStorage.theme ? Themes[localStorage.theme] : Themes.light;

  progress = {gitlab: false, login: false};
  errors: BackendError[] = [];
  form = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  @ViewChild(FormComponent)
  formComponent: FormComponent;

  @ViewChild('content', {read: ElementRef})
  backdrop: ElementRef<HTMLElement>;

  constructor(@Inject(AppConfig) private config: AppConfig,
              private loginGQL: LoginGQL,
              private loginGitlabGQL: GitlabLoginGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    window.postMessage(APPLICATION_READY, location.origin);
    this.route.queryParams
      .pipe(filter(({code, state}) => !!code && !!state))
      .subscribe(({code, state}) => {
        this.progress.gitlab = true;
        this.loginGitlabGQL.mutate({code: code, state: state})
          .pipe(
            catchGQLErrors(),
            finalize(() => this.progress.gitlab = false),
            map(({data: {completeGitlabAuth: {token}}}) =>
              deserialize(token, AccessToken))
          )
          .subscribe((token: AccessToken) => this.logged(token),
            err => this.errors = err);
      });
  }

  login() {
    this.progress.login = true;
    (environment.mocks ? of(getMock(AccessToken)).pipe(delay(MOCKS_DELAY))
      : this.loginGQL.mutate(this.form.value)
        .pipe(catchGQLErrors(),
          map(({data: {login: {token}}}) =>
            deserialize(token, AccessToken))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.login = false))
      .subscribe((token: AccessToken) => this.logged(token),
        err => this.errors = err);
  }

  submit() {
    this.formComponent.submit();
  }

  private logged(token: AccessToken) {
    this.config.token = token;
    this.router.navigate(['/'])
      .then(() => null);
  }

  demo(role: UserRole) {
    this.form.patchValue(DEMO_USERS[role]);
    this.login();
  }

  god(role: UserRole) {
    localStorage.setItem('role', role);
    this.config.token = getMock(AccessToken);
    this.router.navigate(['/'])
      .then(() => null);
  }

}
