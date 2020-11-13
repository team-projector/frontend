import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { IssueProblem } from 'src/models/enums/issue';
import { MergeRequestState, MergeRequestType } from 'src/models/enums/merge-requests';
import { ViewType } from 'src/models/enums/view-type';
import { BackendError } from 'src/types/gql-errors';
import { MergeRequestsFilter, MergeRequestSummary, PagingMergeRequest } from 'src/models/merge-request';
import { getMock } from 'src/utils/mocks';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { equals } from 'src/utils/equals';
import { MergeRequestsState, MergeRequestsStateUpdate } from './merge-requests-list.types';
import { MergeRequestsGQL, MergeRequestSummaryGQL, SyncMergeRequestGQL } from './merge-requests.graphql';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-merge-requests',
  templateUrl: './merge-requests-list.component.html',
  styleUrls: ['./merge-requests-list.component.scss']
})
export class MergeRequestsListComponent implements OnInit {

  ui = UI;
  mergeRequestType = MergeRequestType;
  issueProblem = IssueProblem;
  viewType = ViewType;
  errors: BackendError[] = [];

  // will be used for reset offset
  private reset: Object;

  filter: MergeRequestsFilter;
  summary: MergeRequestSummary;

  progress = {
    syncing: false,
    summary: false
  };

  team: Team;
  user: User;

  tableControl = this.builder.control({
    first: DEFAULT_FIRST,
    offset: 0
  });
  form = this.builder.group({
    table: this.tableControl,
    type: [MergeRequestType.opened]
  });

  @Input()
  set state({first, offset, type, team, user}: MergeRequestsState) {
    this.team = team;
    this.user = user;
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      type: type || MergeRequestType.opened
    }, {emitEvent: false});

    this.load();
  }

  @Input()
  view = ViewType.developer;

  @Output()
  filtered = new EventEmitter<MergeRequestsStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL,
              private syncMergeRequestGQL: SyncMergeRequestGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingMergeRequest, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {mergeRequests}}) =>
            deserialize(mergeRequests, PagingMergeRequest)));
    };

    this.form.valueChanges.subscribe(() => this.load());
    this.table.load();
  }

  private load() {
    const {table: {first}, type} = this.form.getRawValue();
    const filter = new MergeRequestsFilter({
      first: first,
      state: type === MergeRequestType.opened ? MergeRequestState.opened :
        (type === MergeRequestType.closed ? MergeRequestState.closed
          : (type === MergeRequestType.merged ? MergeRequestState.merged : null)),
      team: this.team?.id,
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
      this.loadSummary();
      this.table.load();
    }

    this.filtered.emit(new MergeRequestsStateUpdate({
      first: first !== DEFAULT_FIRST ? first : undefined,
      offset: offset !== 0 ? offset : undefined,
      type: type !== MergeRequestType.opened ? type : undefined
    }));
  }

  loadSummary() {
    this.progress.summary = true;
    (environment.mocks
      ? of(getMock(MergeRequestSummary)).pipe(delay(MOCKS_DELAY))
      : this.mergeRequestsSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, MergeRequestSummary))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary,
        err => this.errors = err);

  }

  sync(mergeRequest: number, hide: Function) {
    this.progress.syncing = true;
    this.syncMergeRequestGQL.mutate({id: mergeRequest})
      .pipe(delay(UI_DELAY), finalize(() => {
        hide();
        this.progress.syncing = false;
      }))
      .subscribe(() => this.table.load(),
        err => this.errors = err);
  }
}
