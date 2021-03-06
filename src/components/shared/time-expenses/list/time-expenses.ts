import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from '@junte/serialize-ts';
import { TimeExpensesState, TimeExpensesStateUpdate } from './time-expenses-list.types';

export abstract class TimeExpensesComponent implements OnInit {

  state: TimeExpensesState;

  protected constructor(private route: ActivatedRoute,
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
    this.router.navigate([serialize(state)],
      {relativeTo: this.route}).then(() => null);
  }

}
