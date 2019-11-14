import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { DefaultSearchFilter, TableComponent, TableFeatures, UI } from 'junte-ui';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PLATFORM_DELAY } from 'src/consts';
import { MergeRequestsFilter, MergeRequestState, MergeRequestSummary, PagingMergeRequest } from 'src/models/merge-request';
import { MergeRequestsGQL, MergeRequestSummaryGQL } from './merge-requests.graphql';

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
  filter = new MergeRequestsFilter();
  stateControl = new FormControl(MergeRequestState.opened);

  form = new FormGroup({
    state: this.stateControl
  });

  @Output() reloaded = new EventEmitter();

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

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Output()
  filtered = new EventEmitter<{ state? }>();

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL) {
  }

  ngOnInit() {
    this.state$.subscribe(state => this.stateControl.patchValue(state, {emitEvent: false}));

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      Object.assign(this.filter, filter);
      return this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {mergeRequests}}) => deserialize(mergeRequests, PagingMergeRequest)));
    };

    combineLatest([this.team$, this.user$, this.project$, this.state$]).pipe(
      debounceTime(PLATFORM_DELAY),
      distinctUntilChanged(),
      map(([team, user, project, state]) => ({team, user, project, state}))
    ).subscribe(filter => {
      Object.assign(this.filter, filter);
      this.table.load();
      this.loadSummary();
    });

    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({state}) => {
        const filtering: { state? } = {};
        if (state !== MergeRequestState.opened) {
          filtering.state = state;
        }
        this.filtered.emit(filtering);
      });
  }

  loadSummary() {
    this.mergeRequestsSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) =>
        deserialize(summary, MergeRequestSummary)))
      .subscribe(summary => this.summary = summary);
  }

}
