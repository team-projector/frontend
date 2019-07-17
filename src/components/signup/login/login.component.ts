import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppConfig} from '../../../app-config';
import {ActivatedRoute, Router} from '@angular/router';
import {IUsersService, users_service} from '../../../services/users/interface';
import {filter, finalize, map} from 'rxjs/operators';
import {Authorization, Config, Error, validate} from 'junte-angular';
import 'reflect-metadata';
import {UI} from 'junte-ui';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {queries} from './login.queries';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ui = UI;

  progress = {gitlab: false, login: false};
  error: Error;
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService,
              @Inject(users_service) private usersService: IUsersService,
              @Inject(Config) private config: AppConfig,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(filter(({code, state}) => !!code && !!state))
      .subscribe(({code, state}) => {
        this.progress.gitlab = true;
        this.usersService.gitlab(code, state)
          .pipe(finalize(() => this.progress.gitlab = false))
          .subscribe(authorization => this.logged(authorization),
            error => this.error = error);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.graphQL.get(queries.login, this.loginForm.value)
        .pipe(finalize(() => this.progress.login = false),
          map(({data: {login: {token: {key}}}}) => {
            return {token: key, type: 'Bearer'} as Authorization;
          }))
        .subscribe(authorization => this.logged(authorization),
          error => this.error = error);
    }
  }

  private logged(authorization: Authorization) {
    this.config.authorization = authorization;
    this.router.navigate(['/'])
      .then(() => null);
  }

}
