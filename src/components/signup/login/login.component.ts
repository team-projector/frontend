import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppConfig} from '../../../app-config';
import {ActivatedRoute, Router} from '@angular/router';
import {ISignupService, signup_service} from '../../../services/signup/interface';
import {UserCredentials} from '../../../models/user-credentials';
import {delay, finalize} from 'rxjs/operators';
import {Config, Error, validate} from 'junte-angular';
import {PLATFORM_DELAY} from '../../../consts';
import 'reflect-metadata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  progress: any = {};
  error: Error;
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(signup_service) private signupService: ISignupService,
              @Inject(Config) private config: AppConfig,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  login() {
    if (validate(this.loginForm)) {
      this.progress.login = true;
      this.signupService.login(this.loginForm.value as UserCredentials)
        .pipe(delay(PLATFORM_DELAY), finalize(() => this.progress.login = false))
        .subscribe(authorization => {
          this.config.authorization = authorization;
          this.router.navigate(['/']);
        }, error => this.error = error);
    }
  }

}
