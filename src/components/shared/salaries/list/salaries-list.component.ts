import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { AllSalariesGQL } from 'src/components/shared/salaries/list/salaries-list.graphql';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { PagingSalaries, SalariesFilter } from 'src/models/salary';
import { getMock } from 'src/utils/mocks';
import { ViewType } from '../../../../models/enums/view-type';
import { User } from '../../../../models/user';
import { equals } from '../../../../utils/equals';
import { SalariesState, SalariesStateUpdate } from './salaries-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.scss']
})
export class SalariesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;

  // will be used for reset offset
  private reset: Object;

  user: User;
  filter: SalariesFilter;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl,
    user: [null]
  });

  @Input()
  set
  state({first, offset, user}: SalariesState) {
    this.user = user;
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
  filtered = new EventEmitter<SalariesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allSalaries: AllSalariesGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingSalaries)).pipe(delay(MOCKS_DELAY))
        : this.allSalaries.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {salaries}}) => deserialize(salaries, PagingSalaries)));
    };

    this.form.valueChanges.subscribe(() => this.load());
    this.table.load();
  }

  private load() {
    const {table: {first}} = this.form.getRawValue();
    const filter = new SalariesFilter({
      first: first,
      user: this.user?.id
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

    if (!!this.table) {
      this.table.load();
    }

    this.filtered.emit(new SalariesStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined
    }));
  }
}
