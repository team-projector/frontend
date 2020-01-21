import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MergeRequestState } from 'src/models/enums/merge-requests';

@Injectable()
export class MergeRequestStateResolver implements Resolve<MergeRequestState> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): MergeRequestState {
    return route.params['state'] || MergeRequestState.opened;
  }
}
