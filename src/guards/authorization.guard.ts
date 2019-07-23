import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppConfig2 } from '../app-config2';


@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(public config: AppConfig2,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.config.token) {
      this.router.navigate(['/signup/login', {redirect: route.url}]);
    }
    return of(!!this.config.token);
  }
}
