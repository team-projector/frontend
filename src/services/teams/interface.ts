import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {PagingTeamMembers, PagingTeams, TeamMemberRole} from '../../models/team';

export interface ITeamsService {

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams>;

  teamMembers(team: number): Observable<PagingTeamMembers>;

}

export let teams_service = new InjectionToken('teams_service');
