import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Config} from 'junte-angular';
import {AppConfig} from '../app-config';
import {Observable, of} from 'rxjs';


@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(@Inject(Config) public config: AppConfig,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.config.authorization) {
      this.router.navigate(['/signup/login', {redirect: route.url}]);
    }
    return of(!!this.config.authorization);
  }
}
