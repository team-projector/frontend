import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from '../environments/environment';
import { Team } from '../models/team';
import { getMock } from '../utils/mocks';
import { TeamGQL } from './team.graphql';

@Injectable()
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(private teamApollo: TeamGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const id = route.params['team'];
    const action = environment.mocks
      ? of(getMock(Team))
      : this.teamApollo.fetch({team: id})
        .pipe(map(({data: {team}}) => deserialize(team, Team)));

    return !!id ? action : of(null);
  }
}
