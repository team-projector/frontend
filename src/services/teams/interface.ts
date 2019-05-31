import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingTeamMembers, PagingTeams, Team, TeamMemberRole } from '../../models/team';
import { PagingErrorCard, PagingTeamIssues } from 'src/models/issue';
import { IssueProblemsFilter, TeamIssueFilter } from 'src/models/problem';

export interface ITeamsService {

  getTeam(team: number): Observable<Team>;

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams>;

  problems(team: number, filter: IssueProblemsFilter): Observable<PagingErrorCard>;

  issues(team: number, filter: TeamIssueFilter): Observable<PagingTeamIssues>;

  teamMembers(team: number): Observable<PagingTeamMembers>;

}

export let teams_service = new InjectionToken('teams_service');
