import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { serialize } from 'serialize-ts';
import { deserialize } from 'serialize-ts/dist';
import { DFNS_LOCALE, FIRST_DAY_OF_WEEK, MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { BonusesFilter, PagingBonuses } from 'src/models/bonus';
import { ViewType } from 'src/models/enums/view-type';
import { Salary } from 'src/models/salary';
import { User } from 'src/models/user';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { equals } from 'src/utils/equals';
import { getMock } from '@junte/mocker';
import { CardSize } from '../../users/card/user-card.types';
import { AllBonusesGQL } from './bonuses-list.graphql';
import { BonusesState, BonusesStateUpdate } from './bonuses-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss']
})
export class BonusesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;
  userCardSize = CardSize;

  // will be used for reset offset
  private reset: Object;

  user: User;
  salary: Salary;
  filter: BonusesFilter;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl
  });

  @Input()
  set state({first, offset, user, salary}: BonusesState) {
    this.logger.debug('set state');
    this.user = user;
    this.salary = salary;
    this.form.patchValue({
      table: {
        first: first || PAGE_SIZE,
        offset: offset || 0
      }
    }, {emitEvent: false});

    this.load();
  }

  @Input()
  view = ViewType.developer;

  @Output()
  filtered = new EventEmitter<BonusesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allBonusesGQL: AllBonusesGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {

  }

  ngOnInit() {
    this.tableControl.valueChanges.subscribe(() =>
      this.logger.debug('table control was changed'));


    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBonuses)).pipe(delay(MOCKS_DELAY))
        : this.allBonusesGQL.fetch(this.filter)
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {bonuses}}) =>
            deserialize(bonuses, PagingBonuses)));
    };

    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });
    this.table.load();
  }

  private load() {
    const {table: {first}} = this.form.getRawValue();
    const filter = new BonusesFilter({
      first: first,
      user: this.user?.id,
      salary: this.salary?.id
    });
    const reset = serialize(filter);
    if (!!this.reset && !equals(reset, this.reset)) {
      this.logger.debug('reset offset');
      this.tableControl.setValue({first, offset: 0}, {emitEvent: false});
    }
    this.reset = reset;

    const {table: {offset}} = this.form.getRawValue();
    filter.offset = offset;

    if (equals(filter, this.filter)) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filter = filter;

    this.logger.debug('load bonuses', this.filter);
    this.table.load();

    this.filtered.emit(new BonusesStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined
    }));
  }

}
