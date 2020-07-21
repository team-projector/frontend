import { OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@junte/ui';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { TimeExpensesState } from 'src/components/issues/time-expenses/time-expenses.component';
import { PenaltiesState } from 'src/components/penalties/penalties.component';

export abstract class PenaltiesListComponent implements OnInit {

  private _state = new PenaltiesState();

  set state(state: PenaltiesState) {
    this._state = state;
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  get state() {
    return this._state;
  }

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, salary}, {q, first, offset}]) => {
        this.state = new TimeExpensesState({
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          user: !!user ? user.id : user,
          salary: !!salary ? salary.id : undefined,
        });
      });
  }

  getState(state: PenaltiesState) {
    throw new Error('Must be overridden');
  }
}
