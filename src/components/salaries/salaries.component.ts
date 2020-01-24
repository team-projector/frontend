import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { AllSalariesGQL } from 'src/components/salaries/salaries.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { PagingSalaries, SalariesFilter } from 'src/models/salary';
import { getMock } from 'src/utils/mocks';

@model()
export class SalariesState {

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  user?: string;

  constructor(defs: SalariesState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  private _filter: SalariesFilter;
  ui = UI;

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

  set filter(filter: SalariesFilter) {
    this._filter = filter;
    this.table.load();
  }

  get filter() {
    return this._filter;
  }

  // TODO: @ViewChild(TableComponent) == undefined in AOT
  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input() set state({first, offset, user}: SalariesState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      user: user || null
    });
  }

  @Output() stateChange = new EventEmitter<SalariesState>();

  constructor(private allSalaries: AllSalariesGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingSalaries)).pipe(delay(MOCKS_DELAY))
        : this.allSalaries.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {allSalaries}}: { data: { allSalaries } }) =>
            deserialize(allSalaries, PagingSalaries)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first}, user}) => {
        this.stateChange.emit(new SalariesState({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          user: user || undefined
        }));
        this.filter = new SalariesFilter({
          offset: offset,
          first: first,
          user: user
        });
      });
  }
}
