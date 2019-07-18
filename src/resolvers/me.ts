import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {graph_ql_service, IGraphQLService} from '../services/graphql/interface';
import {Me} from '../models/user';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';

const query = `query {
      me {
        id
        name
        glAvatar
        roles
        metrics {
          bonus
          penalty
          issuesOpenedCount
          payrollClosed
          payrollOpened
          issuesClosedSpent
          issuesOpenedSpent
        }
      }
    }`;

@Injectable()
export class MeUserResolver implements Resolve<Observable<Me>> {

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Me> {
    return this.graphQL.get(query)
      .pipe(map(({data: {me}}) => deserialize(me, Me)));
  }
}
