import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from '../../../../models/enums/view-type';
import { BonusesState, BonusesStateUpdate } from './bonuses-list.types';

export abstract class BonusesComponent implements OnInit {

  viewType = ViewType;

  state: BonusesState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router,
                        private logger: NGXLogger) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, salary}, {first, offset}]) => {
        this.logger.debug('read router data & params');
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          user: user,
          salary: salary,
        };
      });
  }

  save(state: BonusesStateUpdate) {
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
