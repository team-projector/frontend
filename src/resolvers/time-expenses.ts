import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TimeExpenseState } from 'src/models/spent-time';
import { MergeRequestState } from '../models/merge-request';

@Injectable()
export class TimeExpenseStateResolver implements Resolve<TimeExpenseState> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): TimeExpenseState {
    return route.params['state'] || MergeRequestState.opened;
  }
}
