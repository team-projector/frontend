import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { SalariesState, SalariesStateUpdate } from './salaries.types';

export abstract class SalariesList implements OnInit {

  ui = UI;

  state: SalariesState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router,
                        private logger: NGXLogger) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user}, {first, offset}]) => {
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          user: user
        };
      });
  }

  save(state: SalariesStateUpdate) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
