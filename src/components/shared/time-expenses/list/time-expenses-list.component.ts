import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { OwnerType, TimeExpenseState, TimeExpenseType } from 'src/models/enums/time-expenses';
import { ViewType } from 'src/models/enums/view-type';
import { PagingTimeExpenses, SpentTimesSummary, TimeExpensesFilter } from 'src/models/spent-time';
import { getMock } from 'src/utils/mocks';
import { TimeExpensesGQL, TimeExpensesSummaryGQL } from './time-expenses-list.graphql';
import { TimeExpensesState, TimeExpensesStateUpdate } from './time-expenses-list.types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class TimeExpensesListComponent implements OnInit {

  ui = UI;
  timeExpensesType = TimeExpenseType;
  viewType = ViewType;
  ownerType = OwnerType;
  durationFormat = DurationFormat;

  summary: SpentTimesSummary;
  filter: TimeExpensesFilter;

  @Input()
  type = TimeExpenseType.all;

  tableControl = this.builder.control({
    first: DEFAULT_FIRST,
    offset: 0
  });
  form = this.builder.group({
    table: this.tableControl,
    type: [this.type],
    date: [null],
    team: [null],
    user: [null],
    salary: [null]
  });

  @Input()
  view = ViewType.short;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  set state({first, offset, type, date, team, user, salary}: TimeExpensesState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      type: type || TimeExpenseType.all,
      date: date || null,
      team: team?.id || null,
      user: user?.id || null,
      salary: salary?.id || null,
    }, {emitEvent: false});
  }

  @Output()
  filtered = new EventEmitter<TimeExpensesStateUpdate>();

  constructor(private timeExpensesGQL: TimeExpensesGQL,
              private timeExpensesSummaryGQL: TimeExpensesSummaryGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingTimeExpenses, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.timeExpensesGQL.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {allSpentTimes}}) => deserialize(allSpentTimes, PagingTimeExpenses)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first}, type, team, user, salary, date}) => {
        this.filtered.emit(new TimeExpensesStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== 0 ? offset : undefined,
          type: type !== TimeExpenseType.all ? type : undefined,
          team: team || undefined,
          user: user || undefined,
          salary: salary || undefined,
          date: date || undefined
        }));

        this.load();
      });

    this.load();
  }

  private load() {
    const {table: {offset, first}, type, user, team, salary, date} = this.form.getRawValue();
    this.filter = new TimeExpensesFilter({
      offset: offset,
      first: first,
      state: type === TimeExpenseType.opened ? TimeExpenseState.opened :
        type === TimeExpenseType.closed ? TimeExpenseState.closed : undefined,
      orderBy: type === TimeExpenseType.opened ? 'dueDate' : '-closedAt',
      date: !!date ? startOfDay(date) : null,
      team: team,
      user: user,
      salary: salary || undefined
    });

    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    (environment.mocks
      ? of(getMock(SpentTimesSummary)).pipe(delay(MOCKS_DELAY))
      : this.timeExpensesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {spentTimes}}) => deserialize(spentTimes, SpentTimesSummary))))
      .subscribe(summary => this.summary = summary);
  }
}