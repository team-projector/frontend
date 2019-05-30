import {Injectable} from '@angular/core';
import {ITeamsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {PagingTeamMembers, PagingTeams, TeamMemberRole} from '../../models/team';
import {HttpParams} from '@angular/common/http';
import { PagingErrorCard, PagingTeamIssues } from 'src/models/issue';
import { IssueProblemsFilter } from 'src/models/problem';
import { encodeModel } from 'src/utils/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements ITeamsService {

  constructor(private http: HttpService) {
  }

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams> {
    const filter = {user: user.toString(), roles: roles};
    return this.http.get('teams', new HttpParams({fromObject: filter}))
      .pipe(map(obj => deserialize(obj, PagingTeams)));
  }

  problems(team: number, filter: IssueProblemsFilter): Observable<PagingErrorCard> {
    return this.http.get(`teams/${team}/problems`, encodeModel(filter) as HttpParams)
      .pipe(map(obj => deserialize(obj, PagingErrorCard)));
  }

  issues(team: number, filter: IssueProblemsFilter): Observable<PagingTeamIssues> {
    return this.http.get(`teams/${team}/issues`, encodeModel(filter) as HttpParams)
      .pipe(map(obj => deserialize(obj, PagingTeamIssues)));
  }

  teamMembers(team: number): Observable<PagingTeamMembers> {
    return this.http.get(`teams/${team}/members`)
      .pipe(map(obj => deserialize(obj, PagingTeamMembers)));
  }

}
