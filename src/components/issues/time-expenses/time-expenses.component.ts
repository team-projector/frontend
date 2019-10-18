import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { R } from 'apollo-angular/types';
import { DefaultSearchFilter, TableComponent, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PLATFORM_DELAY } from 'src/consts';
import { IssueState } from 'src/models/issue';
import { TimeExpensesFilter } from 'src/models/spent-time';
import { PagingTimeExpenses } from 'src/models/spent-time';
import { TimeExpensesGQL } from './time-expenses.graphql';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  private user$ = new BehaviorSubject<number>(null);
  private team$ = new BehaviorSubject<number>(null);
  private date$ = new BehaviorSubject<Date>(null);
  private salary$ = new BehaviorSubject<number>(null);

  ui = UI;
  issuesState = IssueState;

  @Output() reloaded = new EventEmitter();

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @Input()
  set team(team: number) {
    this.team$.next(team);
  }

  @Input()
  set date(date: Date) {
    this.date$.next(date);
  }

  @Input()
  set salary(salary: number) {
    this.salary$.next(salary);
  }

  filter: TimeExpensesFilter = new TimeExpensesFilter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private timeExpansesApollo: TimeExpensesGQL) {
  }

  ngOnInit() {
    combineLatest(this.team$, this.user$, this.date$, this.salary$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, date, salary]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.date = date;
        this.filter.salary = salary;
        this.table.fetcher = (filter: DefaultSearchFilter) => {
          Object.assign(this.filter, filter);
          return this.timeExpansesApollo.fetch(serialize(this.filter) as R)
            .pipe(map(({data: {allSpentTimes}}) =>
              deserialize(allSpentTimes, PagingTimeExpenses)));
        };

        this.table.load();
      });
  }

}
