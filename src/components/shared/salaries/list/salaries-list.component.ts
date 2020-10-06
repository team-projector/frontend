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
import { SalariesState, SalariesStateUpdate } from './salaries-list.types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.scss']
})
export class SalariesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;

  filter: SalariesFilter;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: 0
  });
  form = this.builder.group({
    table: this.tableControl,
    user: [null]
  });

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  view = ViewType.developer;

  @Input()
  set state({first, offset, user}: SalariesState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      user: user?.id || null
    }, {emitEvent: false});
  }

  @Output()
  filtered = new EventEmitter<SalariesStateUpdate>();

  constructor(private allSalaries: AllSalariesGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingSalaries)).pipe(delay(MOCKS_DELAY))
        : this.allSalaries.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {salaries}}) => deserialize(salaries, PagingSalaries)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first}, user}) => {
        this.filtered.emit(new SalariesStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== 0 ? offset : undefined,
          user: user || undefined
        }));

        this.load();
      });

    this.load();
  }

  private load() {
    const {table: {offset, first}, user} = this.form.getRawValue();
    this.filter = new SalariesFilter({
      offset: offset,
      first: first,
      user: user
    });

    this.table.load();
  }
}
