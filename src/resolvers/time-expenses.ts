import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TimeExpensesState } from 'src/models/spent-time';
import { MergeRequestState } from '../models/merge-request';

@Injectable()
export class TimeExpensesStateResolver implements Resolve<TimeExpensesState> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): TimeExpensesState {
    return route.params['state'] || MergeRequestState.opened;
  }
}
