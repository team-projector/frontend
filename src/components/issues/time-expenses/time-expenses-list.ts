import { EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { serialize } from 'serialize-ts/dist';
import { TimeExpensesState } from 'src/components/issues/time-expenses/time-expenses.component';

export abstract class TimeExpensesListComponent implements OnInit {

  private _state = new TimeExpensesState();
  @Output() reloaded = new EventEmitter();

  set state(state: TimeExpensesState) {
    this._state = state;
    this.router.navigate([this.getState(serialize(state))],
      {relativeTo: this.route}).then(() => null);
  }

  get state() {
    return this._state;
  }

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, team, salary, project, dueDate}, {q, first, offset, type}]) => {
        this.state = new TimeExpensesState({
          first: +first || undefined,
          offset: +offset || undefined,
          q: q,
          type: type,
          user: !!user ? user.id : user,
          team: !!team ? team.id : team,
          salary: !!salary ? salary.id : undefined,
          project: !!project ? project.id : undefined,
          dueDate: dueDate
        });
      });
  }

  getState(state: TimeExpensesState) {
    throw new Error('Must be overridden');
  }
}
