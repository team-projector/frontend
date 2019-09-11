import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PLATFORM_DELAY } from 'src/consts';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DefaultSearchFilter, TableComponent, TableFeatures, UI } from 'junte-ui';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MergeRequestsGQL, MergeRequestSummaryGQL } from './merge-requests.graphql';
import { R } from 'apollo-angular/types';
import { MergeRequestsFilter, MergeRequestState, MergeRequestSummary, PagingMergeRequest } from '../../../models/merge-request';

export enum ViewType {
  default,
  extended
}

@Component({
  selector: 'app-merge-requests',
  templateUrl: './merge-request.component.html',
  styleUrls: ['./merge-request.component.scss']
})
export class MergeRequestsComponent implements OnInit {

  private team$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<string>(null);
  private project$ = new BehaviorSubject<string>(null);
  private state$ = new BehaviorSubject<MergeRequestState>(MergeRequestState.opened);

  ui = UI;
  mergeRequestState = MergeRequestState;
  viewType = ViewType;
  summary: MergeRequestSummary;
  features = TableFeatures;

  stateControl = new FormControl(MergeRequestState.opened);

  form: FormGroup = this.formBuilder.group({
    state: this.stateControl
  });

  @Input()
  view = ViewType.default;

  @Input()
  set team(team: string) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  @Input()
  set user(user: string) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  @Input()
  set project(project: string) {
    this.project$.next(project);
  }

  get project() {
    return this.project$.getValue();
  }

  @Input()
  set state(state: MergeRequestState) {
    this.state$.next(state);
  }

  get state() {
    return this.state$.getValue();
  }

  filter: MergeRequestsFilter = new MergeRequestsFilter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Output()
  filtered = new EventEmitter<{ state? }>();

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.state$.subscribe(state =>
      this.stateControl.patchValue(state, {emitEvent: false}));

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      Object.assign(this.filter, filter);
      return this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {mergeRequests}}) => deserialize(mergeRequests, PagingMergeRequest)));
    };

    combineLatest(this.team$, this.user$, this.project$, this.state$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, project, state]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.project = project;
        this.filter.state = state;

        this.table.load();
        this.loadSummary();
      });

    this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(({state}) => {
        const filtering: { state? } = {};
        if (state !== MergeRequestState.opened) {
          filtering.state = state;
        }
        this.filtered.emit(filtering);
      });
  }

  private loadSummary() {
    this.mergeRequestsSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) =>
        deserialize(summary, MergeRequestSummary)))
      .subscribe(summary => this.summary = summary);
  }

}
