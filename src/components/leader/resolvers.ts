import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IUsersService, users_service} from '../../services/users/interface';
import {User} from '../../models/user';

@Injectable()
export class UserWithMetricsResolver implements Resolve<Observable<User>> {

  constructor(@Inject(users_service) private usersService: IUsersService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    return this.usersService.get(+route.params['user'], true);
  }
}
