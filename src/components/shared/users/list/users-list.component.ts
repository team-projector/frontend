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
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from '@junte/mocker';
import { UsersFilter, UsersPaging } from 'src/models/user';
import { equals } from 'src/utils/equals';
import { AllUsersGQL } from './users-list.graphql';
import { UsersState, UsersStateUpdate } from './users-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  ui = UI;

  // will be used for reset offset
  private reset: Object;

  filter: UsersFilter;

  tableControl = this.fb.control({
    first: PAGE_SIZE,
    offset: 0
  });
  form = this.fb.group({
    table: this.tableControl
  });

  @Input()
  set state({first, offset}: UsersState) {
    this.logger.debug('set state');
    this.form.patchValue({
      table: {
        first: first || PAGE_SIZE,
        offset: offset || 0
      }
    }, {emitEvent: false});

    this.load();
  }

  @Output()
  filtered = new EventEmitter<UsersStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allUsersGQL: AllUsersGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {

  }

  ngOnInit() {
    this.tableControl.valueChanges.subscribe(() =>
      this.logger.debug('table control was changed'));


    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(UsersPaging)).pipe(delay(MOCKS_DELAY))
        : this.allUsersGQL.fetch(this.filter)
          .pipe(delay(UI_DELAY), catchGQLErrors(), map(({data: {users}}) =>
            deserialize(users, UsersPaging)));
    };

    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });
    this.table.load();
  }

  private load() {
    const {table: {first}} = this.form.getRawValue();
    const filter = new UsersFilter({
      first: first
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

    this.logger.debug('load users', this.filter);
    this.table.load();

    this.filtered.emit(new UsersStateUpdate({
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset !== 0 ? offset : undefined
    }));
  }

}
