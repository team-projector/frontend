import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, TableFeatures, UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { IssueProblem } from 'src/models/enums/issue';
import { MergeRequestState } from 'src/models/enums/merge-requests';
import { ViewType } from 'src/models/enums/view-type';
import { MergeRequestsFilter, MergeRequestSummary, PagingMergeRequest } from 'src/models/merge-request';
import { getMock } from 'src/utils/mocks';
import { MergeRequestsGQL, MergeRequestSummaryGQL } from './merge-requests.graphql';

@model()
export class MergeRequestsState {

  @field()
  q?: string;

  @field()
  sort?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  state?: MergeRequestState;

  @field()
  team?: string;

  @field()
  user?: string;

  @field()
  project?: string;

  constructor(defs: MergeRequestsState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-merge-requests',
  templateUrl: './merge-request.component.html',
  styleUrls: ['./merge-request.component.scss']
})
export class MergeRequestsComponent implements OnInit {

  private _filter: MergeRequestsFilter;
  ui = UI;
  mergeRequestState = MergeRequestState;
  issueProblem = IssueProblem;
  viewType = ViewType;
  summary: MergeRequestSummary;
  features = TableFeatures;

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    table: this.tableControl,
    state: [MergeRequestState.opened],
    team: [null],
    user: [null],
    project: [null],
  });

  set filter(filter: MergeRequestsFilter) {
    this._filter = filter;
    this.load();
  }

  get filter() {
    return this._filter;
  }

  @Input() view = ViewType.default;

  @Input() set state({first, offset, q, state, team, user, project}: MergeRequestsState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      state: state || MergeRequestState.opened,
      team: team || null,
      user: user || null,
      project: project || null,
    });
  }

  @Output() stateChange = new EventEmitter<MergeRequestsState>();
  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingMergeRequest)).pipe(delay(MOCKS_DELAY))
        : this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {mergeRequests}}) => deserialize(mergeRequests, PagingMergeRequest)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, state, user, team, project}) => {
        this.stateChange.emit(new MergeRequestsState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          state: state !== MergeRequestState.opened ? state : undefined,
          user: user || undefined,
          team: team || undefined,
          project: project || undefined,
        }));

        this.filter = new MergeRequestsFilter({
          offset: offset,
          first: first,
          q: q,
          team: team,
          user: user,
          project: project,
          state: state
        });
      });
  }

  private load() {
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
