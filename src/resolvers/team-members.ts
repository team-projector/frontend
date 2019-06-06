import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeamsService, teams_service } from '../services/teams/interface';
import { PagingTeamMembers } from '../models/team';

@Injectable()
export class TeamMembersResolver implements Resolve<Observable<PagingTeamMembers>> {

  constructor(@Inject(teams_service) private teamsService: ITeamsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<PagingTeamMembers> {
    const team = +route.params['team'];
    return !!team ? this.teamsService.members(team) : null;
  }
}
