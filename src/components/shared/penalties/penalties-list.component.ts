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
import { Salary } from '../../../models/salary';
import { User } from '../../../models/user';
import { CardSize } from '../users/card/user-card.types';
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
  userCardSize = CardSize;

  filter: PenaltiesFilter;

  @Input()
  view = ViewType.developer;

  user: User;
  salary: Salary;

  form = this.fb.group({
    table: this.fb.control({
      first: DEFAULT_FIRST,
      offset: 0
    })
  });

  @Input()
  set state({first, offset, user, salary}: PenaltiesState) {
    this.user = user;
    this.salary = salary;
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      }
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

    this.form.valueChanges.subscribe(({table: {offset, first}}) => {
      this.logger.debug('form state was changed');
      this.filtered.emit(new PenaltiesStateUpdate({
        first: first !== DEFAULT_FIRST ? first : undefined,
        offset: offset !== 0 ? offset : undefined
      }));

      this.load();
    });

    this.load();
  }

  private load() {
    const {table: {offset, first}} = this.form.getRawValue();
    this.filter = new PenaltiesFilter({
      offset: offset,
      first: first,
      user: this.user?.id,
      salary: this.salary?.id
    });
    this.logger.debug('load penalties', this.filter);

    this.table.load();
  }

}
