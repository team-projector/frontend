import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { environment } from 'src/environments/environment';
import { getMock } from '@junte/mocker';
import { User } from '../models/user';
import { UserGQL } from './user.graphql';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<Observable<User>> {

  constructor(private userGQL: UserGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const id = route.params['developer'];
    const action = environment.mocks
      ? of(getMock(User, {id: id}))
      : this.userGQL.fetch({user: id})
      .pipe(map(({data: {user}}) => deserialize(user, User)));

    return !!id ? action : of(null);
  }
}
