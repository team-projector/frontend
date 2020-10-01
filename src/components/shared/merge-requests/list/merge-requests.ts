import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { MergeRequestsStateUpdate } from './merge-requests-list.types';

export abstract class MergeRequestsComponent implements OnInit {

  state: MergeRequestsStateUpdate;

  protected constructor(private route: ActivatedRoute,
                        private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, team}, {first, offset, type}]) => {
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          type: type,
          user: user,
          team: team
        };
      });
  }

  save(state: MergeRequestsStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
