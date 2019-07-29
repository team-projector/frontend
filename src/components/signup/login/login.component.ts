import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map } from 'rxjs/operators';
import 'reflect-metadata';
import { UI, validate } from 'junte-ui';
import { GitlabLoginGQL, LoginGQL } from './login.graphql';
import { AccessToken } from 'src/models/access-token';
import { AppConfig } from 'src/app-config';
import { deserialize } from 'serialize-ts/dist';
import { ApolloError } from 'apollo-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui = UI;

  progress = {gitlab: false, login: false};
  error: ApolloError;
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(AppConfig) private config: AppConfig,
              private loginApollo: LoginGQL,
              private loginGitlabApollo: GitlabLoginGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(({code, state}) => !!code && !!state))
      .subscribe(({code, state}) => {
        this.progress.gitlab = true;
        this.loginGitlabApollo.mutate({code: code, state: state})
          .pipe(
            finalize(() => this.progress.gitlab = false),
            map(({data: {completeGitlabAuth: {token}}}) =>
              deserialize(token, AccessToken))
          )
          .subscribe((token: AccessToken) => this.logged(token),
            (error: ApolloError) => this.error = error);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.loginApollo.mutate(this.loginForm.value)
        .pipe(
          finalize(() => this.progress.login = false),
          map(({data: {login: {token}}}) =>
            deserialize(token, AccessToken))
        )
        .subscribe((token: AccessToken) => this.logged(token),
          (error: ApolloError) => this.error = error);
    }
  }

  private logged(token: AccessToken) {
    this.config.token = token;
    this.router.navigate(['/'])
      .then(() => null);
  }

}
