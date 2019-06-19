import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingTeamMembers, PagingTeams, Team, TeamMemberRole } from '../../models/team';
import { PagingErrorCard, PagingTeamIssues } from 'src/models/issue';
import { IssueProblemsFilter, TeamIssueFilter } from 'src/models/problem';

export interface ITeamsService {

  get(team: number): Observable<Team>;

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams>;

  problems(team: number, filter: IssueProblemsFilter): Observable<PagingErrorCard>;

  members(team: number, roles: TeamMemberRole[]): Observable<PagingTeamMembers>;

}

export let teams_service = new InjectionToken('teams_service');
