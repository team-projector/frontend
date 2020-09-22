import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { TimeExpensesState, TimeExpensesStateUpdate } from './time-expenses.types';

export abstract class TimeExpensesListComponent implements OnInit {

  state: TimeExpensesState;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{team, user, salary, date}, {first, offset, type}]) => {
        this.state = {
          first: +first || undefined,
          offset: +offset || undefined,
          type: type,
          date: date,
          team: team,
          user: user,
          salary: salary
        };
      });
  }

  save(state: TimeExpensesStateUpdate) {
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  getState(state: Object) {
    throw new Error('Must be overridden');
  }
}
