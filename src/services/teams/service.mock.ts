import { Injectable } from '@angular/core';
import { ITeamsService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingTeamMembers, PagingTeams, TeamMemberRole } from '../../models/team';


@Injectable({
  providedIn: 'root'
})
export class TeamsMockService implements ITeamsService {

  constructor(private http: HttpMockService) {
  }

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams> {
    return this.http.get('teams/list.json')
      .pipe(map(obj => deserialize(obj, PagingTeams)));
  }

  teamMembers(team: number): Observable<PagingTeamMembers> {
    return this.http.get('teams/team-members.json')
      .pipe(map(obj => deserialize(obj, PagingTeamMembers)));
  }
}
