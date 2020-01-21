import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MergeRequestState } from 'src/models/enums/merge-requests';
import { TimeExpenseState } from 'src/models/enums/time-expenses';

@Injectable()
export class TimeExpenseStateResolver implements Resolve<TimeExpenseState> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): TimeExpenseState {
    return route.params['state'] || MergeRequestState.opened;
  }
}
