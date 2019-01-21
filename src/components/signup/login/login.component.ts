import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from '../../../app-config';
import {ActivatedRoute, Router} from '@angular/router';
import {ISignupService, signup_service} from '../../../services/signup/interface';
import {UserCredentials} from '../../../models/user-credentials';
import {delay, finalize} from 'rxjs/operators';
import {Config, Error, validate} from 'junte-angular';
import {PLATFORM_DELAY} from '../../../consts';
import 'reflect-metadata';
import {IMeService, me_service} from '../../../services/me/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  error: Error;
  loginForm = this.builder.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(@Inject(signup_service) public signupService: ISignupService,
              @Inject(me_service) public meService: IMeService,
              @Inject(Config) private config: AppConfig,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  login() {
    if (validate(this.loginForm)) {
      this.loading = true;
      this.signupService.login(this.loginForm.value as UserCredentials)
        .pipe(delay(PLATFORM_DELAY), finalize(() => this.loading = false))
        .subscribe(authorization => {
          this.config.authorization = authorization;
          this.router.navigate(['/']);
        }, error => this.error = error);
    }
  }

}
