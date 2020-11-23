import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from '../environments/environment';
import { Team } from '../models/team';
import { getMock } from '@junte/mocker';
import { TeamGQL } from './team.graphql';

@Injectable({providedIn: 'root'})
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(private teamGQL: TeamGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const id = route.params['team'];
    const action = environment.mocks
      ? of(getMock(Team, {id: id}))
      : this.teamGQL.fetch({team: id})
        .pipe(map(({data: {team}}) => deserialize(team, Team)));

    return !!id ? action : of(null);
  }
}
