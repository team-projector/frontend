import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@junte/ui';
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
import { Salary } from 'src/models/salary';
import { PagingTimeExpenses, SpentTimesSummary, TimeExpensesFilter } from 'src/models/spent-time';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { BackendError } from 'src/types/gql-errors';
import { equals } from 'src/utils/equals';
import { getMock } from '@junte/mocker';
import { LocalUI } from '../../../../enums/local-ui';
import { CardSize } from '../../users/card/user-card.types';
import { TimeExpensesGQL, TimeExpensesSummaryGQL } from './time-expenses-list.graphql';
import { TimeExpensesState, TimeExpensesStateUpdate } from './time-expenses-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class TimeExpensesListComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  timeExpensesType = TimeExpenseType;
  viewType = ViewType;
  ownerType = OwnerType;
  durationFormat = DurationFormat;
  userCardSize = CardSize;
  today = new Date();

  // will be used for reset offset
  private reset: Object;

  summary: SpentTimesSummary;
  filter: TimeExpensesFilter;
  errors: BackendError[] = [];

  team: Team;
  user: User;
  salary: Salary;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl,
    type: [TimeExpenseType.all],
    date: [null]
  });

  @Input()
  view = ViewType.developer;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  set state({first, offset, type, date, team, user, salary}: TimeExpensesState) {
    this.team = team;
    this.salary = salary;
    this.user = user;
    this.salary = salary;
    this.form.patchValue({
      table: {
        first: first || PAGE_SIZE,
        offset: offset || 0
      },
      type: type || TimeExpenseType.all,
      date: date || null
    }, {emitEvent: false});

    this.load();
  }

  @Output()
  filtered = new EventEmitter<TimeExpensesStateUpdate>();

  constructor(private timeExpensesGQL: TimeExpensesGQL,
              private timeExpensesSummaryGQL: TimeExpensesSummaryGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingTimeExpenses, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.timeExpensesGQL.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {timeExpenses}}) =>
            deserialize(timeExpenses, PagingTimeExpenses)));
    };

    this.form.valueChanges.subscribe(() => this.load());
    this.table.load();
  }

  private load() {
    const {table: {first}, type, date} = this.form.getRawValue();
    const filter = new TimeExpensesFilter({
      first: first,
      state: type === TimeExpenseType.opened ? TimeExpenseState.opened :
        type === TimeExpenseType.closed ? TimeExpenseState.closed : undefined,
      orderBy: type === TimeExpenseType.opened ? 'dueDate' : '-closedAt',
      date: !!date ? startOfDay(date) : null,
      team: this.team?.id,
      user: this.user?.id,
      salary: this.salary?.id
    });

    const reset = serialize(filter);
    if (!!this.reset && !equals(reset, this.reset)) {
      this.tableControl.setValue({first, offset: 0}, {emitEvent: false});
    }
    this.reset = reset;

    const {table: {offset}} = this.form.getRawValue();
    filter.offset = offset;

    if (equals(filter, this.filter)) {
      return;
    }
    this.filter = filter;

    this.loadSummary();
    if (!!this.table) {
      this.table.load();
    }

    this.filtered.emit(new TimeExpensesStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined,
      type: type !== TimeExpenseType.all ? type : undefined,
      date: date || undefined
    }));
  }

  loadSummary() {
    (environment.mocks
      ? of(getMock(SpentTimesSummary)).pipe(delay(MOCKS_DELAY))
      : this.timeExpensesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, SpentTimesSummary))))
      .subscribe(summary => this.summary = summary,
        err => this.errors = err);
  }
}
