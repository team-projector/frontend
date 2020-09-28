import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssueProblem, IssueState, IssuesType } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesFilter, IssuesSummary, PagingIssues } from 'src/models/issue';
import { getMock } from 'src/utils/mocks';
import { Project } from '../../../../models/project';
import { IssuesGQL, IssuesSummaryGQL, SyncIssueGQL } from './issues-list.graphql';
import { IssuesState, IssuesStateUpdate } from './issues-list.types';

const DEFAULT_FIRST = 10;

@Component({
  selector: 'app-issues',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  ui = UI;
  issueState = IssueState;
  issueProblem = IssueProblem;
  issuesType = IssuesType;
  viewType = ViewType;
  standardLabel = StandardLabel;
  durationFormat = DurationFormat;

  progress = {summary: false, syncing: false};
  filter: IssuesFilter;
  summary: IssuesSummary;
  project: Project;

  tableControl = this.fb.control({
    q: null,
    first: DEFAULT_FIRST,
    offset: 0
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

  @Input()
  view = ViewType.default;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  set state({first, offset, q, type, dueDate, team, user, project}: IssuesState) {
    this.project = project;
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || 0
      },
      type: type || IssuesType.opened,
      dueDate: dueDate || null,
      team: team?.id || null,
      user: user?.id || null,
      project: project?.id || null
    }, {emitEvent: false});
  }

  @Output()
  filtered = new EventEmitter<IssuesStateUpdate>();

  constructor(private issuesGQL: IssuesGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingIssues, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.issuesGQL.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    this.form.valueChanges.subscribe(({table: {offset, first, q}, type, dueDate, user, team, project}) => {
      this.logger.debug('form state was changed');
      this.filtered.emit(new IssuesStateUpdate({
        q: q || undefined,
        first: first !== DEFAULT_FIRST ? first : undefined,
        offset: offset !== 0 ? offset : undefined,
        type: type !== IssuesType.opened ? type : undefined,
        dueDate: dueDate || undefined,
        user: user || undefined,
        team: team || undefined,
        project: project || undefined
      }));

      this.load();
    });

    this.load();
  }

  private load() {
    const {table: {offset, first, q}, type, dueDate, user, team, project} = this.form.getRawValue();
    this.filter = new IssuesFilter({
      offset: offset,
      first: first,
      q: q,
      orderBy: type === IssuesType.opened ? 'dueDate' : '-closedAt',
      dueDate: !!dueDate ? startOfDay(dueDate) : null,
      user: user,
      project: project,
      team: team,
      state: type === IssuesType.opened ? IssueState.opened :
        (type === IssuesType.closed ? IssueState.closed : null),
      problems: type === IssuesType.problems ? true : null
    });
    this.logger.debug('load issues', this.filter);

    this.loadSummary();
    this.table.load();
  }

  loadSummary() {
    this.logger.debug('load summary');
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
      : this.issuesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, IssuesSummary))))
      .pipe(finalize(() => this.progress.summary = false))
      .subscribe(summary => this.summary = summary);
  }

  sync(issue: number, hide: Function) {
    this.progress.syncing = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(delay(UI_DELAY), finalize(() => {
        hide();
        this.progress.syncing = false;
      }))
      .subscribe(() => this.table.load());
  }
}
