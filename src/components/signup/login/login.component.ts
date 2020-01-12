import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UI, validate } from 'junte-ui';
import 'reflect-metadata';
import { of } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AppConfig } from 'src/app-config';
import { AccessToken } from 'src/models/access-token';
import { APPLICATION_READY } from '../../../consts';
import { environment } from '../../../environments/environment';
import { GqlError } from '../../../models/gql-errors';
import { UserRole } from '../../../models/user';
import { catchGQLErrors } from '../../../operators/catch-gql-error';
import { getMock } from '../../../utils/mocks';
import { GitlabLoginGQL, LoginGQL } from './login.graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui = UI;
  userRole = UserRole;
  mocks = environment.mocks;

  progress = {gitlab: false, login: false};
  errors: GqlError[] = [];
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(AppConfig) private config: AppConfig,
              private loginGQL: LoginGQL,
              private loginGitlabApollo: GitlabLoginGQL,
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
        this.loginGitlabApollo.mutate({code: code, state: state})
          .pipe(
            catchGQLErrors(),
            finalize(() => this.progress.gitlab = false),
            map(({data: {completeGitlabAuth: {token}}}) =>
              deserialize(token, AccessToken))
          )
          .subscribe((token: AccessToken) => this.logged(token),
            (err: GqlError[]) => this.errors = err);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      (environment.mocks ? of(getMock(AccessToken))
        : this.loginGQL.mutate(this.loginForm.value)
          .pipe(catchGQLErrors(),
            map(({data: {login: {token}}}) =>
              deserialize(token, AccessToken))))
        .pipe(finalize(() => this.progress.login = false))
        .subscribe((token: AccessToken) => this.logged(token),
          (err: GqlError[]) => this.errors = err);
    }
  }

  private logged(token: AccessToken) {
    this.config.token = token;
    this.router.navigate(['/'])
      .then(() => null);
  }

  god(role: UserRole) {
    localStorage.setItem('role', role);
    this.config.token = getMock(AccessToken);
    this.router.navigate(['/'])
      .then(() => null);
  }

}
