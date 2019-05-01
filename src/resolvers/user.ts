import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IUsersService, users_service} from '../services/users/interface';
import {User} from '../models/user';
import {IMeService, me_service} from '../services/me/interface';

@Injectable()
export class UserWithMetricsResolver implements Resolve<Observable<User>> {

  constructor(@Inject(me_service) private meService: IMeService,
              @Inject(users_service) private usersService: IUsersService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const user = +route.params['user'];
    return !!user ? this.usersService.get(+route.params['user'], true)
      : this.meService.getUser(true);
  }
}
