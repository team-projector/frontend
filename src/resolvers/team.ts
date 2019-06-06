import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeamsService, teams_service } from '../services/teams/interface';
import { Team } from '../models/team';

@Injectable()
export class TeamResolver implements Resolve<Observable<Team>> {

  constructor(@Inject(teams_service) private teamsService: ITeamsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Team> {
    const team = +route.params['team'];
    return !!team ? this.teamsService.get(team) : null;
  }
}
