import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { deserialize } from 'serialize-ts/dist';
import { UserGQL } from './user.graphql';

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {

  constructor(private userApollo: UserGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const id = route.params['user'];
    return !!id ? this.userApollo.fetch({user: id})
        .pipe(map(({data: {user}}) => deserialize(user, User)))
      : of(null);
  }
}
