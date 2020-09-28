import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { BonusesFilter, PagingBonuses } from '../../../../models/bonus';
import { ViewType } from '../../../../models/enums/view-type';
import { AllBonusesGQL } from './bonuses-list.graphql';
import { BonusesState, BonusesStateUpdate } from './bonuses-list.types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss']
})
export class BonusesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;

  filter: BonusesFilter;

  @Input()
  view = ViewType.default;

  tableControl = this.fb.control({
    first: DEFAULT_FIRST,
    offset: 0
  });

  form = this.fb.group({
    table: this.tableControl,
    user: [null],
    salary: [null]
  });

  @Input()
  set state({first, offset, user, salary}: BonusesState) {
    this.logger.debug('set state');
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      user: user?.id || null,
      salary: salary?.id || null
    }, {emitEvent: false});
  }

  @Output()
  filtered = new EventEmitter<BonusesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allBonusesGQL: AllBonusesGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {

  }

  ngOnInit() {
    this.tableControl.valueChanges.subscribe(() => this.logger.debug('table control was changed'));


    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBonuses)).pipe(delay(MOCKS_DELAY))
        : this.allBonusesGQL.fetch(this.filter)
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {bonuses}}) => deserialize(bonuses, PagingBonuses)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first}, user, salary}) => {
      this.logger.debug('form state was changed');
      this.filtered.emit(new BonusesStateUpdate({
        first: first !== DEFAULT_FIRST ? first : undefined,
        offset: offset !== 0 ? offset : undefined,
        user: user || undefined,
        salary: salary || undefined
      }));

      this.load();
    });

    this.load();
  }

  private load() {
    const {table: {offset, first}, user, salary} = this.form.getRawValue();
    this.filter = new BonusesFilter({
      offset: offset,
      first: first,
      orderBy: 'dueDate',
      user: user,
      salary: salary
    });
    this.logger.debug('load bonuses', this.filter);

    this.table.load();
  }

}
