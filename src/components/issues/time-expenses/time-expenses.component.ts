import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { DATE_FORMAT, MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { IssueState } from 'src/models/enums/issue';
import { TimeExpenseState } from 'src/models/enums/time-expenses';
import { PagingTimeExpenses, SpentTimesSummary, TimeExpensesFilter } from 'src/models/spent-time';
import { DateSerializer } from 'src/serializers/date';
import { getMock } from 'src/utils/mocks';
import { TimeExpensesGQL, TimeExpensesSummaryGQL } from './time-expenses.graphql';

@model()
export class TimeExpensesState {
  @field()
  q?: string;

  @field()
  sort?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  state?: TimeExpenseState;

  @field()
  team?: string;

  @field()
  user?: string;

  @field()
  project?: string;

  @field()
  salary?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  constructor(defs: TimeExpensesState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  private _filter: TimeExpensesFilter;
  ui = UI;
  issuesState = IssueState;
  timeExpensesState = TimeExpenseState;
  summary: SpentTimesSummary;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    state: [TimeExpenseState.opened],
    dueDate: [null],
    team: [null],
    project: [null],
    salary: [null],
    user: [null],
  });

  set filter(filter: TimeExpensesFilter) {
    this._filter = filter;
    this.load();
  }

  get filter() {
    return this._filter;
  }

  @Input() set state({first, offset, q, state, dueDate, team, user, project, salary}: TimeExpensesState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      state: state || TimeExpenseState.opened,
      dueDate: dueDate || null,
      team: team || null,
      user: user || null,
      project: project || null,
      salary: salary || null,
    });
  }

  @Output() stateChange = new EventEmitter<TimeExpensesState>();
  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private timeExpensesGQL: TimeExpensesGQL,
              private timeExpensesSummaryGQL: TimeExpensesSummaryGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    console.log(getMock(PagingTimeExpenses));
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingTimeExpenses)).pipe(delay(MOCKS_DELAY))
        : this.timeExpensesGQL.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {allSpentTimes}}) => deserialize(allSpentTimes, PagingTimeExpenses)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, state, user, team, project, salary, dueDate}) => {
        this.stateChange.emit(new TimeExpensesState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          state: state !== TimeExpenseState.opened ? state : undefined,
          user: user || undefined,
          team: team || undefined,
          project: project || undefined,
          salary: salary || undefined,
          dueDate: !!dueDate ? dueDate : undefined
        }));

        this.filter = new TimeExpensesFilter({
          offset: offset,
          first: first,
          state: state !== TimeExpenseState.all ? state : undefined,
          orderBy: state === TimeExpenseState.opened ? 'dueDate' : '-closedAt',
          project: project,
          salary: salary,
          team: team,
          user: user,
          date: !!dueDate ? startOfDay(dueDate) : null
        });
      });
  }

  private load() {
    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    console.log(SpentTimesSummary);
    (environment.mocks
      ? of(getMock(SpentTimesSummary)).pipe(delay(MOCKS_DELAY))
      : this.timeExpensesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {spentTimes}}) => deserialize(spentTimes, SpentTimesSummary))))
      .subscribe(summary => this.summary = summary);
  }
}
