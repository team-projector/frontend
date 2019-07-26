import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { TeamGQL } from './team.graphql';


@Injectable()
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(private teamApollo: TeamGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const id = route.params['team'];
    return this.teamApollo.fetch({team: id})
      .pipe(map(({data: {team}}) =>
        deserialize(team, Team)));
  }
}
