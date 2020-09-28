import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isEqual, TableComponent, UI } from '@junte/ui';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { ViewType } from '../../../models/enums/view-type';
import { PagingPenalties, PenaltiesFilter } from '../../../models/penalty';
import { AllPenaltiesGQL } from './penalties.graphql';
import { PenaltiesState, PenaltiesStateUpdate } from './penalties.types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties-list.component.html',
  styleUrls: ['./penalties-list.component.scss']
})
export class PenaltiesListComponent implements OnInit {

  ui = UI;
  viewType = ViewType;

  filter: PenaltiesFilter;

  @Input()
  view = ViewType.default;

  form = this.fb.group({
    table: this.fb.control({
      first: DEFAULT_FIRST,
      offset: 0
    }),
    salary: [null],
    user: [null]
  });

  @Input()
  set state({first, offset, user, salary}: PenaltiesState) {
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
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {penalties}}) => deserialize(penalties, PagingPenalties)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first}, user, salary}) => {
      this.logger.debug('form state was changed');
      this.filtered.emit(new PenaltiesStateUpdate({
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
