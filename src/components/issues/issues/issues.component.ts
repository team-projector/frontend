import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DEFAULT_FIRST, DEFAULT_OFFSET, TableComponent, UI, untilJSONChanged } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { IssueProblem, IssueState, IssuesType } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesFilter, IssuesSummary, PagingIssues } from 'src/models/issue';
import { getMock } from 'src/utils/mocks';
import { Project } from '../../../models/project';
import { IssuesGQL, IssuesSummaryGQL, SyncIssueGQL } from './issues.graphql';
import { IssuesState, IssuesStateUpdate } from './issues.types';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  ui = UI;
  issueState = IssueState;
  issueProblem = IssueProblem;
  issuesType = IssuesType;
  viewType = ViewType;
  standardLabel = StandardLabel;
  durationFormat = DurationFormat;

  progress = {summary: false, sync: false};
  filter: IssuesFilter;
  project: Project;
  summary: IssuesSummary;

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

  @Input()
  view = ViewType.default;

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Input()
  set state({first, offset, q, type, dueDate, team, user, project, milestone, ticket}: IssuesState) {
    this.project = project;
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || DEFAULT_FIRST,
        offset: offset || DEFAULT_OFFSET
      },
      type: type || IssuesType.opened,
      dueDate: dueDate || null,
      team: team?.id || null,
      user: user?.id || null,
      milestone: milestone?.id || null,
      project: project?.id || null,
      ticket: ticket?.id || null
    });
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
          .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    this.form.valueChanges.pipe(untilJSONChanged())
      .subscribe(({table: {offset, first, q}, type, user, team, project, milestone, ticket, dueDate}) => {
        this.logger.debug('form state was changed');
        this.filtered.emit(new IssuesStateUpdate({
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

        this.load();
      });
  }

  private load() {
    const {table: {offset, first, q}, type, user, team, project, milestone, ticket, dueDate} = this.form.getRawValue();
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

  sync(issue: number) {
    this.progress.sync = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }
}
