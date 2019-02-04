import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppConfig} from '../../../app-config';
import {ActivatedRoute, Router} from '@angular/router';
import {IUsersService, users_service} from '../../../services/users/interface';
import {UserCredentials} from '../../../models/user-credentials';
import {delay, filter, finalize} from 'rxjs/operators';
import {Authorization, Config, Error, validate} from 'junte-angular';
import {PLATFORM_DELAY} from '../../../consts';
import 'reflect-metadata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  progress: any = {};
  error: Error;
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(users_service) private usersService: IUsersService,
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
          .pipe(delay(PLATFORM_DELAY), finalize(() => this.progress.gitlab = false))
          .subscribe(this.logged.bind(this), error => this.error = error);
      });
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.usersService.login(new UserCredentials(this.loginForm.value))
        .pipe(delay(PLATFORM_DELAY), finalize(() => this.progress.login = false))
        .subscribe(this.logged.bind(this), error => this.error = error);
    }
  }

  private logged(authorization: Authorization) {
    this.config.authorization = authorization;
    this.router.navigate(['/']);
  }

}
