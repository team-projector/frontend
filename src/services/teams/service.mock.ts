import { Injectable } from '@angular/core';
import { ITeamsService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingTeamMembers, PagingTeams, TeamMemberRole } from '../../models/team';
import { PagingErrorCard, PagingTeamIssues } from 'src/models/issue';
import { IssueProblemsFilter, TeamIssueFilter } from 'src/models/problem';
import { Team } from 'src/models/team';


@Injectable({
  providedIn: 'root'
})
export class TeamsMockService implements ITeamsService {

  constructor(private http: HttpMockService) {
  }

  get(team: number): Observable<Team> {
    return this.http.get('teams/team.json')
      .pipe(map(obj => deserialize(obj, Team)));
  }

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams> {
    return this.http.get('teams/list.json')
      .pipe(map(obj => deserialize(obj, PagingTeams)));
  }

  problems(team: number, filter: IssueProblemsFilter): Observable<PagingErrorCard> {
    return this.http.get('teams/list-problems.json')
      .pipe(map(obj => deserialize(obj, PagingErrorCard)));
  }

  members(team: number): Observable<PagingTeamMembers> {
    return this.http.get('teams/team-members.json')
      .pipe(map(obj => deserialize(obj, PagingTeamMembers)));
  }
}
