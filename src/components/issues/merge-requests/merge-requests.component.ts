import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { DEFAULT_FIRST, DEFAULT_OFFSET, defined, isEqual, TableComponent, TableFeatures, UI } from 'junte-ui';
import merge from 'merge-anything';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssueProblem } from 'src/models/issue';
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

  ui = UI;
  mergeRequestState = MergeRequestState;
  issueProblem = IssueProblem;
  viewType = ViewType;
  summary: MergeRequestSummary;
  features = TableFeatures;

  stateControl = this.builder.control(MergeRequestState.opened);
  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });
  form = this.builder.group({
    state: this.stateControl,
    table: this.tableControl
  });

  filter: MergeRequestsFilter;

  @Input() user: string;
  @Input() view = ViewType.default;
  @Output() reloaded = new EventEmitter();

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private mergeRequestsGQL: MergeRequestsGQL,
              private mergeRequestsSummaryGQL: MergeRequestSummaryGQL,
              private builder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.mergeRequestsGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {mergeRequests}}) => deserialize(mergeRequests, PagingMergeRequest)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q, sort}, state}) => this.save(offset, first, q, sort, state));

    this.route.params.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({q, sort, first, offset, state, team, user, project}) => {
        // if (!!this.filter && (this.filter.team != team || this.filter.user != user || this.filter.project != project)) {
        //   offset = 0;
        // }
        const form = merge({extensions: [defined]}, this.form.getRawValue(), {
          table: {q, sort, first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET},
          state: state || MergeRequestState.opened
        });
        const filter = {team, user: user || this.user, project};
        this.filter = new MergeRequestsFilter({...filter, ...form.table, state: form.state});
        this.loadSummary();
        this.table.load();
        this.form.patchValue(form, {emitEvent: false});
      });
  }

  save(offset, first, q, sort, state: MergeRequestState) {
    const filter: { q?, sort?, first?, offset?, state? } = {};
    const params = this.route.snapshot.params;
    if (offset !== DEFAULT_OFFSET) {
      filter.offset = offset;
    }
    if (first !== DEFAULT_FIRST) {
      filter.first = first;
    }
    if (!!sort) {
      filter.sort = sort;
    }

    if (!!q) {
      filter.q = q;
    }
    if (q != params.q && (q !== '' || !!params.q)) {
      delete filter.offset;
    }

    if (!!state && state !== MergeRequestState.opened) {
      filter.state = state;
    }
    if (state != params.state && (state !== MergeRequestState.opened || !!params.state)) {
      delete filter.offset;
    }

    if (!!params.user) {
      this.filter.user = params.user;
    }
    if (!!params.project) {
      this.filter.project = params.project;
    }
    this.router.navigate([filter], {relativeTo: this.route}).then(() => null);
  }

  loadSummary() {
    this.mergeRequestsSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) =>
        deserialize(summary, MergeRequestSummary)))
      .subscribe(summary => this.summary = summary);
  }
}
