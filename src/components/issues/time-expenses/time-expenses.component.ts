import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DEFAULT_PAGE_SIZE, PLATFORM_DELAY } from 'src/consts';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { TimeExpensesFilter } from 'src/models/spent-time';
import { IssueState } from 'src/models/issue';
import { DefaultSearchFilter, TableComponent, UI } from 'junte-ui';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PagingTimeExpenses } from '../../../models/spent-time';
import { TimeExpensesGQL } from './time-expenses.graphql';
import { R } from 'apollo-angular/types';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  ui = UI;

  issuesState = IssueState;

  private user$ = new BehaviorSubject<number>(null);
  private team$ = new BehaviorSubject<number>(null);
  private date$ = new BehaviorSubject<Date>(null);
  private salary$ = new BehaviorSubject<number>(null);

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

  filter: TimeExpensesFilter = new TimeExpensesFilter({offset: 0, first: DEFAULT_PAGE_SIZE});

  @ViewChild('table')
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
