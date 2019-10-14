import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { Milestone } from 'src/models/milestone';
import { MilestoneGQL } from 'src/resolvers/milestone.graphql';

@Injectable()
export class MilestoneResolver implements Resolve<Observable<Milestone>> {

  constructor(private milestoneApollo: MilestoneGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Milestone> {
    const id = route.params['milestone'];
    return this.milestoneApollo.fetch({milestone: id})
      .pipe(map(({data: {milestone}}) =>
        deserialize(milestone, Milestone)));
  }
}
