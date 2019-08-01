import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PLATFORM_DELAY} from 'src/consts';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, map} from 'rxjs/operators';
import {DefaultSearchFilter, TableComponent, UI} from 'junte-ui';
import {FormBuilder, FormGroup} from '@angular/forms';
import {deserialize, serialize} from 'serialize-ts/dist';
import {IssueProblem, IssuesFilter, IssuesSummary, IssueState, IssuesType, PagingIssues} from '../../../models/issue';
import {IssuesGQL, IssuesSummaryGQL, ProjectsSummaryGQL, SyncIssueGQL} from './issues.graphql';
import {R} from 'apollo-angular/types';
import {DurationFormat} from '../../../pipes/date';

export enum ViewType {
  default,
  extended
}

enum SummaryType {
  issues,
  projects
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  viewType = ViewType;
  durationFormat = DurationFormat;

  summary: IssuesSummary;
  progress = {loading: false, sync: false};
  colors = [UI.colors.purple, UI.colors.red, UI.colors.green, UI.colors.yellow];

  @Input()
  view = ViewType.default;

  form: FormGroup = this.formBuilder.group({
    project: [],
    type: [IssuesType.opened]
  });

  private team$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<string>(null);
  private project$ = new BehaviorSubject<string>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);
  private type$ = new BehaviorSubject<IssuesType>(IssuesType.opened);

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
  set dueDate(dueDate: Date) {
    this.dueDate$.next(dueDate);
  }

  get dueDate() {
    return this.dueDate$.getValue();
  }

  @Input()
  set type(type: IssuesType) {
    this.type$.next(type);
  }

  get type() {
    return this.type$.getValue();
  }

  filter: IssuesFilter = new IssuesFilter();

  @ViewChild('table')
  table: TableComponent;

  @Output()
  filtered = new EventEmitter<{ type? }>();

  constructor(private issuesGQL: IssuesGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private projectsSummaryGQL: ProjectsSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    combineLatest(this.project$, this.type$)
      .subscribe(([project, type]) => {
        this.form.patchValue({
          project: project,
          type: type
        }, {emitEvent: false});
      });

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      Object.assign(this.filter, filter);
      return this.issuesGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {allIssues}}: { data: { allIssues } }) =>
          deserialize(allIssues, PagingIssues)));
    };

    combineLatest(this.team$, this.user$, this.project$, this.dueDate$, this.type$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, project, dueDate, type]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.project = project;
        this.filter.dueDate = dueDate;
        this.filter.state = type === IssuesType.opened ? IssueState.opened : null;
        this.filter.problems = type === IssuesType.problems ? true : null;

        this.loadSummary(SummaryType.projects);
        this.loadSummary(SummaryType.issues);
        this.table.load();
      });

    this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(({project, type}) => {
        // TODO: why?
        // [this.project, this.type] = [project, type];
        const state: { project?, type? } = {};
        if (!!project) {
          state.project = project;
        }
        if (type !== IssuesType.opened) {
          state.type = type;
        }
        this.filtered.emit(state);
      });
  }

  private loadSummary(type: SummaryType) {
    this.progress.loading = true;
    const fetcher = type === SummaryType.issues
      ? this.issuesSummaryGQL : this.projectsSummaryGQL;
    fetcher.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {issuesSummary}}) =>
          deserialize(issuesSummary, IssuesSummary)),
        finalize(() => this.progress.loading = false))
      .subscribe(summary =>
        !!this.summary ? Object.assign(this.summary, summary)
          : this.summary = summary);
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncIssueGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }

}
