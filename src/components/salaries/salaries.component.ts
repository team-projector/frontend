import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { AllSalariesGQL } from 'src/components/salaries/salaries.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { PagingSalaries, SalariesFilter } from 'src/models/salary';
import { getMock } from 'src/utils/mocks';
import { SalariesState, SalariesStateUpdate } from './salaries.types';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  ui = UI;

  filter: SalariesFilter;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    user: [null]
  });

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  set state({first, offset, user}: SalariesState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
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
          .pipe(map(({data: {salaries}}) => deserialize(salaries, PagingSalaries)));
    };

    this.form.valueChanges.pipe(untilJSONChanged())
      .subscribe(({table: {offset, first}, user}) => {
        this.filtered.emit(new SalariesStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
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
