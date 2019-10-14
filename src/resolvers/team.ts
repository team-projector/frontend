import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { Team } from '../models/team';
import { TeamGQL } from './team.graphql';

@Injectable()
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(private teamApollo: TeamGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const id = route.params['team'];
    const action = this.teamApollo.fetch({team: id})
      .pipe(map(({data: {team}}) => deserialize(team, Team)));

    return !!id ? action : of(null);
  }
}
