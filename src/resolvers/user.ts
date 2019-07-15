import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {graph_ql_service, IGraphQLService} from '../services/graphql/interface';
import {map} from 'rxjs/operators';
import {User} from '../models/graphql/user';
import {deserialize} from 'serialize-ts';

const query = {
  user: `query ($user: ID!) {
    user (id: $user) {
      id
      name
      glAvatar
      roles
    }
  }`,
  me: `query {
      me {
        id
        name
        glAvatar
        roles
      }
    }`
};

@Injectable()
export class UserResolver implements Resolve<Observable<User>> {

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const id = +route.params['user'];
    return !!id ? this.graphQL.get(query.user, {user: id})
        .pipe(map(({data: {user}}) =>
          deserialize(user, User)))
      : of(null);
  }
}

@Injectable()
export class UserOrMeResolver implements Resolve<Observable<User>> {

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    const id = +route.params['user'];
    return !!id ? this.graphQL.get(query.user, {user: id})
        .pipe(map(({data: {user}}) =>
          deserialize(user, User)))
      : this.graphQL.get(query.me).pipe(map(({data: {me}}) =>
        deserialize(me, User)));
  }
}

