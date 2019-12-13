import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloError } from 'apollo-client';
import { UI, validate } from 'junte-ui';
import 'reflect-metadata';
import { filter, finalize, map, tap } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AppConfig } from 'src/app-config';
import { AccessToken } from 'src/models/access-token';
import { APPLICATION_READY } from 'src/consts';
import { GitlabLoginGQL, LoginGQL } from './login.graphql';

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
    window.postMessage(APPLICATION_READY, location.origin);
    this.route.queryParams.pipe(filter(({code, state}) => !!code && !!state))
      .subscribe(({code, state}) => {
        this.progress.gitlab = true;
        this.loginGitlabApollo.mutate({code: code, state: state}).pipe(
          finalize(() => this.progress.gitlab = false),
          map(({data: {completeGitlabAuth: {token}}}) =>
            deserialize(token, AccessToken))
        ).subscribe((token: AccessToken) => this.logged(token),
          (error: ApolloError) => this.error = error);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.loginApollo.mutate(this.loginForm.value).pipe(
        tap(({errors}) => console.log(errors)),
        finalize(() => this.progress.login = false),
        map(({data: {login: {token}}}) => deserialize(token, AccessToken))
      ).subscribe((token: AccessToken) => this.logged(token),
        (error: ApolloError) => this.error = error);
    }
  }

  private logged(token: AccessToken) {
    this.config.token = token;
    this.router.navigate(['/'])
      .then(() => null);
  }

}
