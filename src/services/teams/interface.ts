import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {PagingTeamMembers, PagingTeams, Team, TeamMemberRole} from '../../models/team';

export interface ITeamsService {

  get(team: number): Observable<Team>;

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams>;

  members(team: number, roles: TeamMemberRole[]): Observable<PagingTeamMembers>;

}

export let teams_service = new InjectionToken('teams_service');
