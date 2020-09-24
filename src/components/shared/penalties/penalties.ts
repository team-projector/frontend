import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { PenaltiesState, PenaltiesStateUpdate } from './penalties.types';

export abstract class PenaltiesComponent implements OnInit {

  state: PenaltiesState;

  protected constructor(private route: ActivatedRoute,
                        private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, salary}, {first, offset}]) => {
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
