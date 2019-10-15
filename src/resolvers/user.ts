import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { User } from '../models/user';
import { UserGQL } from './user.graphql';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {

  constructor(private userGQL: UserGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const id = route.params['user'];
    const action = this.userGQL.fetch({user: id})
      .pipe(map(({data: {user}}) => deserialize(user, User)));

    return !!id ? action : of(null);
  }
}
