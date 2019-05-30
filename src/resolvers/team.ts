import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeamsService, teams_service } from '../services/teams/interface';
import { PagingTeamMembers } from '../models/team';

@Injectable()
export class TeamResolver implements Resolve<number> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): number {
    return +route.params['team'] || null;
  }
}
