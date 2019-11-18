import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { DefaultSearchFilter, TableComponent, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PLATFORM_DELAY } from 'src/consts';
import { IssueState } from 'src/models/issue';
import { PagingTimeExpenses, SpentTimesSummary, TimeExpensesFilter, TimeExpensesState } from 'src/models/spent-time';
import { TimeExpensesGQL, TimeExpensesSummaryGQL } from './time-expenses.graphql';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  private user$ = new BehaviorSubject<string>(null);
  private team$ = new BehaviorSubject<number>(null);
  private date$ = new BehaviorSubject<Date>(null);
  private salary$ = new BehaviorSubject<number>(null);
  private state$ = new BehaviorSubject<TimeExpensesState>(TimeExpensesState.opened);

  ui = UI;
  issuesState = IssueState;
  timeExpensesState = TimeExpensesState;
  filter = new TimeExpensesFilter();
  stateControl = this.builder.control(TimeExpensesState.opened);
  summary: SpentTimesSummary;

  form = this.builder.group({
    state: this.stateControl
  });

  @Input()
  set user(user: string) {
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

  @Input()
  set state(state: TimeExpensesState) {
    this.state$.next(state);
  }

  get state() {
    return this.state$.getValue();
  }

  @Output() reloaded = new EventEmitter();
  @Output() filtered = new EventEmitter<{ state? }>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private timeExpensesGQL: TimeExpensesGQL,
              private TimeExpensesSummaryGQL: TimeExpensesSummaryGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.state$.subscribe(state => this.stateControl.patchValue(state, {emitEvent: false}));

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      Object.assign(this.filter, filter);
      return this.timeExpensesGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {allSpentTimes}}) => deserialize(allSpentTimes, PagingTimeExpenses)));
    };

    combineLatest([this.team$, this.user$, this.date$, this.salary$, this.state$]).pipe(
      debounceTime(PLATFORM_DELAY),
      distinctUntilChanged(),
      map(([team, user, date, salary, state]) => ({team, user, date, salary, state}))
    ).subscribe(filter => {
      Object.assign(this.filter, filter);
      this.table.load();
      this.loadSummary();
    });

    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({state}) => {
        const filtering: { state? } = {};
        if (state !== TimeExpensesState.opened) {
          filtering.state = state;
        }
        this.filtered.emit(filtering);
      });
  }

  loadSummary() {
    this.TimeExpensesSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {spentTimes}}) => deserialize(spentTimes, SpentTimesSummary)))
      .subscribe(summary => this.summary = summary);
  }
}
