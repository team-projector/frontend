import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { environment } from '../environments/environment';
import { Me } from '../models/user';
import { getMock } from '@junte/mocker';
import { catchGQLErrors } from '../utils/gql-errors';
import { MeGQL } from './me.graphql';

@Injectable({providedIn: 'root'})
export class MeUserResolver implements Resolve<Observable<Me>> {

  constructor(private meGQL: MeGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return environment.mocks ? of(getMock(Me)) : this.meGQL.fetch()
      .pipe(catchGQLErrors(), map(({data: {me}}) => deserialize(me, Me)));
  }
}
