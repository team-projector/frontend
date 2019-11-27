import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { format } from 'date-fns';
import { DEFAULT_FIRST, DEFAULT_OFFSET, defined, isEqual, TableComponent, TableFeatures, UI } from 'junte-ui';
import merge from 'merge-anything';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssueProblem, IssuesFilter, IssuesSummary, IssueState, IssuesType, PagingIssues } from 'src/models/issue';
import { StandardLabel } from 'src/models/label';
import { IssuesGQL, IssuesSummaryGQL, SyncIssueGQL } from './issues.graphql';

export enum ViewType {
  default,
  extended
}

export class IssuesState {
  q?: string;
  sort?: string;
  first?: number;
  offset?: number;
  type?: IssuesType;
  team?: string;
  user?: string;
  project?: string;
  due_date?: string;
  milestone?: string;
  ticket?: string;

  constructor(defs: IssuesState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  private filter$ = new BehaviorSubject<IssuesFilter>(null);
  private _state: IssuesState;
  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  issuesType = IssuesType;
  viewType = ViewType;
  features = TableFeatures;
  standardLabel = StandardLabel;

  summary: IssuesSummary;
  progress = {summary: false, sync: false};

  tableControl = this.builder.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.builder.group({
    table: this.tableControl,
    type: [IssuesType.opened],
    user: [],
    team: [],
    project: [],
    due_date: [],
    milestone: [],
    ticket: []
  });

  set filter(filter: IssuesFilter) {
    this.filter$.next(filter);
  }

  get filter() {
    return this.filter$.getValue();
  }

  @Input() view = ViewType.default;
  @Input() draggable = false;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input() set state(state: IssuesState) {
    this._state = state;
    this.form.patchValue(merge({extensions: [defined]}, this.form.getRawValue(), {
      table: {q: state.q, sort: state.sort, first: state.first, offset: state.offset},
      type: state.type, team: state.team, user: state.user, project: state.project,
      due_date: state.due_date, milestone: state.milestone, ticket: state.ticket
    }));
  }

  get state() {
    return this._state;
  }

  @Output() reloaded = new EventEmitter();
  @Output() stateChange = new EventEmitter<IssuesState>();

  constructor(private issuesGQL: IssuesGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return this.issuesGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q, sort}, type, user, team, project, due_date, milestone, ticket}) =>
        this.save(offset, first, q, sort, type, user, team, project, due_date, milestone, ticket));

    this.filter$.pipe(
      filter(filter => !!filter),
      distinctUntilChanged((val1, val2) => isEqual(val1, val2))
    ).subscribe(() => this.load());
  }

  load() {
    this.loadSummary();
    this.table.load();
  }

  save(offset, first, q, sort, type, user, team, project, due_date, milestone, ticket) {
    const filter = new IssuesFilter();

    if (!!sort) {
      filter.sort = sort;
    }
    if (!!user) {
      filter.user = user;
    }
    if (!!due_date) {
      filter.dueDate = new Date(format(due_date, 'YYYY-MM-DD'));
    }
    if (!!project) {
      filter.project = project;
    }
    if (!!ticket) {
      filter.ticket = ticket;
    }
    if (!!milestone) {
      filter.milestone = milestone;
    }

    filter.offset = offset;
    filter.first = first;
    filter.state = type === IssuesType.opened ? IssueState.opened : (type === IssuesType.closed ? IssueState.closed : null);
    filter.problems = type === IssuesType.problems ? true : null;
    filter.sort = type === IssuesType.opened ? 'dueDate' : '-closedAt';

    const state = new IssuesState({
      q: q || null, sort: sort || null, first: +first || DEFAULT_FIRST, offset: +offset || DEFAULT_OFFSET,
      type: type || IssuesType.opened, user: user, due_date: due_date || null,
      team: team || null, project: project || null, milestone: milestone || null, ticket: ticket || null
    });
    this.filter = filter;
    if (!isEqual(state, this._state)) {
      this._state = state;
      this.stateChange.emit(state);
    }
  }

  loadSummary() {
    this.progress.summary = true;
    this.issuesSummaryGQL.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {summary}}) =>
          deserialize(summary, IssuesSummary)),
        finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }

  dropped(event: CdkDragDrop<any>) {
    if (!!event.container.element.nativeElement.attributes.getNamedItem('ticket')) {
      this.sync(event.item.data.issue);
    }
  }
}
