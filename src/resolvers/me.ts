import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { Me } from '../models/user';
import { catchGQLErrors } from '../operators/catch-gql-error';
import { MeGQL } from './me.graphql';

@Injectable()
export class MeUserResolver implements Resolve<Observable<Me>> {

  constructor(private meGQL: MeGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return this.meGQL.fetch()
      .pipe(catchGQLErrors(),
        map(({data: {me}}) => deserialize(me, Me)));
  }
}
