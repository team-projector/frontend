import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { BonusesFilter, PagingBonuses } from 'src/models/salary';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { BonusesState, BonusesStateUpdate } from './bonuses-list.types';
import { AllBonusesGQL } from './bonuses-list.graphql';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses-list.component.html',
  styleUrls: ['./bonuses-list.component.scss']
})
export class BonusesListComponent implements OnInit {

  ui = UI;

  filter: BonusesFilter;

  tableControl = this.builder.control({
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    user: [null],
    salary: [null]
  });

  @Input()
  set state({first, offset, user, salary}: BonusesState) {
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
  filtered = new EventEmitter<BonusesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allBonusesGQL: AllBonusesGQL,
              private builder: FormBuilder) {

  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingBonuses)).pipe(delay(MOCKS_DELAY))
        : this.allBonusesGQL.fetch(this.filter)
          .pipe(catchGQLErrors(), map(({data: {bonuses}}) => deserialize(bonuses, PagingBonuses)));
    };

    this.form.valueChanges.pipe(untilJSONChanged())
      .subscribe(({table: {offset, first}, user, salary}) => {
        this.filtered.emit(new BonusesStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
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

    this.table.load();
  }

}
