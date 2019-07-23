import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, finalize, map, tap } from 'rxjs/operators';
import { Error, validate } from 'junte-angular';
import 'reflect-metadata';
import { UI } from 'junte-ui';
import { LoginGQL } from './login.graphql';
import { AccessToken } from 'src/models/authorization';
import { AppConfig2 } from 'src/app-config2';
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

  constructor(@Inject(AppConfig2) private config: AppConfig2,
              private loginApollo: LoginGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(({code, state}) => !!code && !!state))
      .subscribe(({code, state}) => {
        // this.progress.gitlab = true;
        // this.usersService.gitlab(code, state)
        //   .pipe(finalize(() => this.progress.gitlab = false))
        //   .subscribe(authorization => this.logged(authorization),
        //     error => this.error = error);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.loginApollo.mutate(this.loginForm.value)
        .pipe(
          finalize(() => this.progress.login = false),
          map(({data: {login: {token}}}) =>
            deserialize(token, AccessToken)
          )
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
