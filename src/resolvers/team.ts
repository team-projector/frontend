import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Team} from '../models/team';
import {graph_ql_service, IGraphQLService} from '../services/graphql/interface';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts/dist';

const query = `query ($team: ID!) {
      team(id: $team) {
        id
        title
      }
    }`;

@Injectable()
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const id = +route.params['team'];
    return this.graphQL.get(query, {team: id})
      .pipe(map(({data: {team}}) =>
        deserialize(team, Team)));
  }
}
