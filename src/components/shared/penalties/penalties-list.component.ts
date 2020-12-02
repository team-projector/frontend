import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { serialize } from '@junte/serialize-ts';
import { deserialize } from '@junte/serialize-ts';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { ViewType } from 'src/models/enums/view-type';
import { PagingPenalties, PenaltiesFilter } from 'src/models/penalty';
import { Salary } from 'src/models/salary';
import { User } from 'src/models/user';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { equals } from 'src/utils/equals';
import { getMock } from '@junte/mocker';
import { BonusesStateUpdate } from '../bonuses/list/bonuses-list.types';
import { CardSize } from '../users/card/user-card.types';
import { AllPenaltiesGQL } from './penalties.graphql';
import { PenaltiesState, PenaltiesStateUpdate } from './penalties.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties-list.component.html',
  styleUrls: ['./penalties-list.component.scss']
})
export class PenaltiesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;
  userCardSize = CardSize;

  // will be used for reset offset
  private reset: Object;

  user: User;
  salary: Salary;
  filter: PenaltiesFilter;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl
  });

  @Input()
  set state({first, offset, user, salary}: PenaltiesState) {
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
  filtered = new EventEmitter<PenaltiesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allPenaltiesGQL: AllPenaltiesGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingPenalties)).pipe(delay(MOCKS_DELAY))
        : this.allPenaltiesGQL.fetch(this.filter)
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {penalties}}) =>
            deserialize(penalties, PagingPenalties)));
    };

    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });
    this.table.load();
  }

  private load() {
    const {table: {first}} = this.form.getRawValue();
    const filter = new PenaltiesFilter({
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

    this.logger.debug('load penalties', this.filter);
    this.table.load();

    this.filtered.emit(new BonusesStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined
    }));
  }

}
