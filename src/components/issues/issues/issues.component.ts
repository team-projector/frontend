import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { DEFAULT_FIRST, DEFAULT_OFFSET, isEqual, TableComponent, UI } from '@junte/ui';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { DATE_FORMAT, MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssueProblem, IssueState, IssuesType } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesFilter, IssuesSummary, PagingIssues } from 'src/models/issue';
import { DateSerializer } from 'src/serializers/date';
import { getMock } from 'src/utils/mocks';
import { IssuesGQL, IssuesSummaryGQL, SyncIssueGQL } from './issues.graphql';

@model()
export class IssuesState {

  @field()
  q?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  type?: IssuesType;

  @field()
  team?: string;

  @field()
  user?: string;

  @field()
  project?: string;

  @field()
  milestone?: string;

  @field()
  ticket?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

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

  private _filter: IssuesFilter;

  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  issuesType = IssuesType;
  viewType = ViewType;
  standardLabel = StandardLabel;
  durationFormat = DurationFormat;

  summary: IssuesSummary;
  progress = {summary: false, sync: false};

  tableControl = this.fb.control({
    q: null,
    sort: null,
    first: DEFAULT_FIRST,
    offset: DEFAULT_OFFSET
  });

  form = this.fb.group({
    table: this.tableControl,
    type: [IssuesType.opened],
    dueDate: [null],
    team: [null],
    milestone: [null],
    user: [null],
    project: [null],
    ticket: [null]
  });

  set filter(filter: IssuesFilter) {
    this._filter = filter;
    this.load();
  }

  get filter() {
    return this._filter;
  }

  @Input() view = ViewType.default;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input() set state({first, offset, q, type, dueDate, team, user, project, milestone, ticket}: IssuesState) {
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      type: type || IssuesType.opened,
      dueDate: dueDate || null,
      team: team || null,
      user: user || null,
      milestone: milestone || null,
      project: project || null,
      ticket: ticket || null
    });
  }

  @Output() stateChange = new EventEmitter<IssuesState>();
  @Output() reloaded = new EventEmitter();

  constructor(private issuesGQL: IssuesGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingIssues, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.issuesGQL.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    this.form.valueChanges.pipe(distinctUntilChanged((val1, val2) => isEqual(val1, val2)))
      .subscribe(({table: {offset, first, q}, type, user, team, project, milestone, ticket, dueDate}) => {
        this.stateChange.emit(new IssuesState({
          q: q || undefined,
          first: first !== DEFAULT_FIRST ? first : undefined,
          offset: offset !== DEFAULT_OFFSET ? offset : undefined,
          type: type !== IssuesType.opened ? type : undefined,
          user: user || undefined,
          team: team || undefined,
          project: project || undefined,
          milestone: milestone || undefined,
          ticket: ticket || undefined,
          dueDate: !!dueDate ? dueDate : undefined
        }));
        this.filter = new IssuesFilter({
          offset: offset,
          first: first,
          q: q,
          orderBy: type === IssuesType.opened ? 'dueDate' : '-closedAt',
          milestone: milestone,
          team: team,
          user: user,
          project: project,
          ticket: ticket,
          dueDate: !!dueDate ? startOfDay(dueDate) : null,
          state: type === IssuesType.opened ? IssueState.opened :
            (type === IssuesType.closed ? IssueState.closed : null),
          problems: type === IssuesType.problems ? true : null
        });
      });
  }

  private load() {
    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
      : this.issuesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, IssuesSummary))))
      .pipe(finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }
}
