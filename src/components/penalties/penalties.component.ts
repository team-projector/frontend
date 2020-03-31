import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { AllPenaltiesGQL } from 'src/components/salaries/salaries.graphql';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { TimeExpenseType } from 'src/models/enums/time-expenses';
import { PagingPenalties, PenaltiesFilter } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';

@model()
export class PenaltiesState {
  @field()
  q?: string;

  @field()
  sort?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  user?: string;

  @field()
  salary?: string;

  constructor(defs: PenaltiesState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss']
})
export class PenaltiesComponent implements OnInit {

  private _filter: PenaltiesFilter;
  ui = UI;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    type: [TimeExpenseType.opened],
    dueDate: [null],
    team: [null],
    project: [null],
    salary: [null],
    user: [null],
  });

  set filter(filter: PenaltiesFilter) {
    this._filter = filter;
    this.table.load();
  }

  get filter() {
    return this._filter;
  }

  @Input() set state({first, offset, q, user, salary}: PenaltiesState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      user: user || null,
      salary: salary || null,
    });
  }

  @Output() stateChange = new EventEmitter<PenaltiesState>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allPenaltiesGQL: AllPenaltiesGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, type, user, salary}) => {
        this.stateChange.emit(new PenaltiesState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          user: user || undefined,
          salary: salary || undefined
        }));

        this.filter = new PenaltiesFilter({
          offset: offset,
          first: first,
          orderBy: type === TimeExpenseType.opened ? 'dueDate' : '-closedAt',
          salary: salary,
          user: user
        });
      });

    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingPenalties)).pipe(delay(MOCKS_DELAY))
        : this.allPenaltiesGQL.fetch(this.filter)
          .pipe(catchGQLErrors(), map(({data: {allPenalties}}) => deserialize(allPenalties, PagingPenalties)));
    };
    this.table.load();
  }

}
