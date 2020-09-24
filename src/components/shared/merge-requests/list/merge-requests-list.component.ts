import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { IssueProblem } from 'src/models/enums/issue';
import { MergeRequestState, MergeRequestType } from 'src/models/enums/merge-requests';
import { ViewType } from 'src/models/enums/view-type';
import { MergeRequestsFilter, MergeRequestSummary, PagingMergeRequest } from 'src/models/merge-request';
import { getMock } from 'src/utils/mocks';
import { MergeRequestsGQL, MergeRequestSummaryGQL } from './merge-requests.graphql';
import { MergeRequestsState, MergeRequestsStateUpdate } from './merge-requests-list.types';

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

  filter: MergeRequestsFilter;
  summary: MergeRequestSummary;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    type: [MergeRequestType.opened],
    team: [null],
    user: [null]
  });

  @Input()
  view = ViewType.default;

  @Input() set state({first, offset, type, team, user}: MergeRequestsState) {
    this.form.patchValue({
      table: {
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      type: type || MergeRequestType.opened,
      team: team?.id || null,
      user: user?.id || null
    });
  }

  @Output()
  filtered = new EventEmitter<MergeRequestsStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingMergeRequest, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {mergeRequests}}) => deserialize(mergeRequests, PagingMergeRequest)));
    };

    this.form.valueChanges.pipe(untilJSONChanged())
      .subscribe(({table: {offset, first}, type, user, team}) => {
        this.filtered.emit(new MergeRequestsStateUpdate({
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          type: type !== MergeRequestType.opened ? type : undefined,
          user: user || undefined,
          team: team || undefined
        }));

        this.load();
      });
  }

  private load() {
    const {table: {offset, first}, type, user, team} = this.form.getRawValue();

    this.filter = new MergeRequestsFilter({
      offset: offset,
      first: first,
      state: type === MergeRequestType.opened ? MergeRequestState.opened :
        (type === MergeRequestType.closed ? MergeRequestState.closed
          : (type === MergeRequestType.merged ? MergeRequestState.merged : null)),
      team: team,
      user: user
    });

    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    (environment.mocks
      ? of(getMock(MergeRequestSummary)).pipe(delay(MOCKS_DELAY))
      : this.mergeRequestsSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, MergeRequestSummary))))
      .subscribe(summary => this.summary = summary);
  }
}
