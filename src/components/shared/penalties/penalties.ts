import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { ViewType } from '../../../models/enums/view-type';
import { PenaltiesState, PenaltiesStateUpdate } from './penalties.types';

export abstract class PenaltiesComponent implements OnInit {

  viewType = ViewType;

  state: PenaltiesState;

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

  save(state: PenaltiesStateUpdate) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
