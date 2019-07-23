import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Me } from '../models/user';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MeGQL } from './me.graphql';

@Injectable()
export class MeUserResolver implements Resolve<Observable<Me>> {

  constructor(private meApollo: MeGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return this.meApollo.fetch()
      .pipe(map(({data: {me}}) => deserialize(me, Me)));
  }
}
