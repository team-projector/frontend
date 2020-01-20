import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { Milestone } from 'src/models/milestone';
import { MilestoneGQL } from 'src/resolvers/milestone.graphql';
import { getMock } from 'src/utils/mocks';

@Injectable()
export class MilestoneResolver implements Resolve<Observable<Milestone>> {

  constructor(private milestoneApollo: MilestoneGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Milestone> {
    const id = route.params['milestone'];
    return environment.mocks
      ? of(getMock(Milestone, {id: id})).pipe(delay(MOCKS_DELAY))
      : this.milestoneApollo.fetch({milestone: id})
      .pipe(map(({data: {milestone}}) =>
        deserialize(milestone, Milestone)));
  }
}
