import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from 'src/models/enums/view-type';
import { BreaksStateUpdate } from './work-breaks-list-types';

export abstract class BreaksTableComponent implements OnInit {

  viewType = ViewType;

  state: BreaksStateUpdate;

  protected constructor(private route: ActivatedRoute,
                        private router: Router) {

  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, team}, {first, offset}]) => {
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          user: user,
          team: team
        };
      });
  }

  save(state: BreaksStateUpdate) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overriden');
  }
}
