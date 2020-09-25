import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { PagingPenalties, PenaltiesFilter } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { AllPenaltiesGQL } from './penalties.graphql';
import { PenaltiesState, PenaltiesStateUpdate } from './penalties.types';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties-list.component.html',
  styleUrls: ['./penalties-list.component.scss']
})
export class PenaltiesListComponent implements OnInit {

  ui = UI;

  filter: PenaltiesFilter;

  form = this.fb.group({
    table: this.fb.control({
      first: DEFAULT_FIRST,
      offset: DEFAULT_OFFSET
    }),
    salary: [null],
    user: [null]
  });

  @Input()
  set state({first, offset, user, salary}: PenaltiesState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      user: user?.id || null,
      salary: salary?.id || null
    });
  }

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
          .pipe(catchGQLErrors(), map(({data: {penalties}}) => deserialize(penalties, PagingPenalties)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first}, user, salary}) => {
        this.logger.debug('form state was changed');
        this.filtered.emit(new PenaltiesStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          user: user || undefined,
          salary: salary || undefined
        }));
      });

    this.load();
  }

  private load() {
    const {table: {offset, first}, user, salary} = this.form.getRawValue();
    this.filter = new PenaltiesFilter({
      offset: offset,
      first: first,
      salary: salary,
      user: user
    });
    this.logger.debug('load penalties', this.filter);

    this.table.load();
  }

}
