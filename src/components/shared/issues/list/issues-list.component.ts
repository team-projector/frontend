import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getMock } from '@junte/mocker';
import { deserialize, serialize } from '@junte/serialize-ts';
import { BreakpointService, TableComponent, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { startOfDay } from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { AssigneeType, IssueSort, IssueState, IssuesType } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { ViewType } from 'src/models/enums/view-type';
import { IssuesFilter, IssuesSummary, PagingIssues, ProjectSummary } from 'src/models/issue';
import { Project } from 'src/models/project';
import { PagingTeamMembers, Team, TeamMember } from 'src/models/team';
import { User, UserIssuesFilter, UserIssuesSummary } from 'src/models/user';
import { BackendError } from 'src/types/gql-errors';
import { equals } from 'src/utils/equals';
import { CardSize } from '../../users/card/user-card.types';
import {
  IssuesGQL,
  IssuesSummaryGQL,
  ProjectsSummaryGQL,
  SyncIssueGQL,
  TeamMembersGQL,
  UserIssuesSummaryGQL
} from './issues-list.graphql';
import { IssuesState, IssuesStateUpdate } from './issues-list.types';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-issues',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  localUi = LocalUI;
  ui = UI;
  issueState = IssueState;
  issuesType = IssuesType;
  assigneeType = AssigneeType;
  viewType = ViewType;
  standardLabel = StandardLabel;
  durationFormat = DurationFormat;
  userCardSize = CardSize;

  tablet = (this.breakpoint.current === UI.breakpoint.tablet) || (this.breakpoint.current === UI.breakpoint.mobile);

  private _team: Team;
  private _user: User;
  // will be used for reset offset
  private reset: Object;

  progress = {
    projects: false,
    developers: false,
    summary: false,
    syncing: false
  };
  errors: BackendError[] = [];

  project: Project;
  developer: User;
  filter: IssuesFilter;
  projects: ProjectSummary[] = [];
  developers: TeamMember[] = [];
  summary: { issues?: IssuesSummary, user?: UserIssuesSummary } = {};

  set team(team: Team) {
    if (!!team && team.id !== this._team?.id) {
      this._team = team;
      this.loadDevelopers();
      this.loadProjects();
    }
  }

  get team() {
    return this._team;
  }

  set user(user: User) {
    if (!!user && user.id !== this._user?.id) {
      this._user = user;
      this.loadProjects();
    }
  }

  get user() {
    return this._user;
  }

  tableControl = this.fb.control({
    q: null,
    first: PAGE_SIZE,
    offset: 0
  });
  dueDateControl = this.fb.control(null);
  form = this.fb.group({
    table: this.tableControl,
    type: [IssuesType.opened],
    dueDate: this.dueDateControl,
    project: [null],
    developer: [null],
    assignee: [AssigneeType.assignedTo]
  });

  @Input()
  set state({first, offset, q, type, dueDate, user, team, developer, project, assignee}: IssuesState) {
    this.team = team;
    this.user = user;
    this.project = project;
    this.developer = developer;
    this.form.patchValue({
      table: {
        q: q || null,
        first: first || PAGE_SIZE,
        offset: offset || 0
      },
      type: type || IssuesType.opened,
      user: user || null,
      assignee: assignee || AssigneeType.assignedTo,
      dueDate: dueDate || null,
      project: project?.id || null,
      developer: developer?.id || null
    }, {emitEvent: false});

    this.load();
  }

  @Input()
  view = ViewType.developer;

  @Output()
  filtered = new EventEmitter<IssuesStateUpdate>();

  @ViewChild('table', {static: true})
  table: TableComponent;

  today = () => new Date();

  constructor(private issuesGQL: IssuesGQL,
              private teamMembersGQL: TeamMembersGQL,
              private projectsSummaryGQL: ProjectsSummaryGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private userIssuesSummaryGQL: UserIssuesSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private fb: FormBuilder,
              private logger: NGXLogger,
              public breakpoint: BreakpointService) {
  }

  ngOnInit() {
    this.table.fetcher = () => {
      return environment.mocks
        ? of(getMock(PagingIssues, this.filter)).pipe(delay(MOCKS_DELAY))
        : this.issuesGQL.fetch(serialize(this.filter) as R)
          .pipe(delay(UI_DELAY), map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    this.form.valueChanges.subscribe(() => {
      this.logger.debug('form state was changed');
      this.load();
    });

    this.table.load();
  }

  private loadProjects() {
    const filter = new IssuesFilter({
      team: this.team?.id
    });
    this.logger.debug('load projects');
    this.progress.projects = true;
    return (environment.mocks
      ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
      : this.projectsSummaryGQL.fetch(serialize(filter) as R)
        .pipe(map(({data: {summary}}) =>
          deserialize(summary, IssuesSummary))))
      .pipe(finalize(() => this.progress.projects = false))
      .subscribe(({projects}) => this.projects = projects,
        err => this.errors = err);
  }

  private loadDevelopers() {
    this.progress.developers = true;
    (environment.mocks
      ? of(getMock(PagingTeamMembers)).pipe(delay(MOCKS_DELAY))
      : this.teamMembersGQL.fetch({team: this.team.id} as R)
        .pipe(map(({data: {team: {members}}}) => deserialize(members, PagingTeamMembers))))
      .pipe(finalize(() => this.progress.developers = false))
      .subscribe(members => this.developers = members.results,
        err => this.errors = err);
  }

  private load() {
    const {table: {first, q}, type, dueDate, project, developer, assignee} = this.form.getRawValue();
    const filter = new IssuesFilter({
      first: first,
      q: q,
      sort: type === IssuesType.opened ? IssueSort.dueDateAsc : IssueSort.closedAtDesc,
      dueDate: !!dueDate ? startOfDay(dueDate) : null,
      team: this.team?.id,
      project: project,
      assignedTo: assignee === AssigneeType.assignedTo ? (this.user?.id || developer) : null,
      createdBy: assignee === AssigneeType.createdBy ? this.user?.id : null,
      participatedBy: assignee === AssigneeType.participatedBy ? this.user?.id : null,
      state: type === IssuesType.opened ? IssueState.opened :
        (type === IssuesType.closed ? IssueState.closed : null),
      problems: type === IssuesType.problems ? true : null
    });
    const reset = serialize(filter);
    if (!!this.reset && !equals(reset, this.reset)) {
      this.logger.debug('reset offset');
      this.tableControl.setValue({q, first, offset: 0}, {emitEvent: false});
    }
    this.reset = reset;

    const {table: {offset}} = this.form.getRawValue();
    filter.offset = offset;

    if (equals(filter, this.filter)) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filter = filter;

    this.logger.debug('load issues', this.filter);
    this.loadSummary();
    if (!!this.user?.id) {
      this.loadUserSummary();
    }
    if (!!this.table) {
      this.table.load();
    }

    this.filtered.emit(new IssuesStateUpdate({
      q: q || undefined,
      first: first !== PAGE_SIZE ? first : undefined,
      offset: offset > 0 ? offset : undefined,
      type: type !== IssuesType.opened ? type : undefined,
      assignee: assignee !== AssigneeType.assignedTo ? assignee : undefined,
      dueDate: dueDate || undefined,
      project: project || undefined,
      developer: developer || undefined
    }));
  }

  loadSummary() {
    this.logger.debug('load summary');
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(IssuesSummary)).pipe(delay(MOCKS_DELAY))
      : this.issuesSummaryGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.summary = false))
      .subscribe(issues => this.summary.issues = <IssuesSummary>issues,
        err => this.errors = err);
  }

  loadUserSummary() {
    this.logger.debug('load user summary');
    const {dueDate, project} = this.form.getRawValue();
    const filter = new UserIssuesFilter({
      user: this.user?.id,
      dueDate: !!dueDate ? startOfDay(dueDate) : null,
      project: project,
    });
    this.progress.summary = true;
    return (environment.mocks
      ? of(getMock(User)).pipe(delay(MOCKS_DELAY))
      : this.userIssuesSummaryGQL.fetch(serialize(filter) as R)
        .pipe(map(({data: {user}}) => deserialize(user, User))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.summary = false))
      .subscribe(user => this.summary.user = user.issuesSummary,
        err => this.errors = err);
  }

  sync(issue: number, hide: Function) {
    this.progress.syncing = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(delay(UI_DELAY), finalize(() => {
        hide();
        this.progress.syncing = false;
      }))
      .subscribe(() => this.table.load(),
        err => this.errors = err);
  }
}
