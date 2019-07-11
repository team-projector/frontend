import {Injectable} from '@angular/core';
import {ITeamsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {PagingTeamMembers, PagingTeams, TeamMemberRole} from '../../models/team';
import {HttpParams} from '@angular/common/http';
import {encodeModel} from 'src/utils/http';
import {Team} from 'src/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements ITeamsService {

  constructor(private http: HttpService) {
  }

  get(team: number): Observable<Team> {
    return this.http.get(`teams/${team}`)
      .pipe(map(obj => deserialize(obj, Team)));
  }

  list(user: number, roles: TeamMemberRole[]): Observable<PagingTeams> {
    const filter = {user: user.toString(), roles: roles};
    return this.http.get('teams', new HttpParams({fromObject: filter}))
      .pipe(map(obj => deserialize(obj, PagingTeams)));
  }

  members(team: number, roles: TeamMemberRole[]): Observable<PagingTeamMembers> {
    return this.http.get(`teams/${team}/members`, new HttpParams({fromObject: {roles: roles, metrics: 'True'}}))
      .pipe(map(obj => deserialize(obj, PagingTeamMembers)));
  }

}
