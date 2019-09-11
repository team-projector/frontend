import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PLATFORM_DELAY } from 'src/consts';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { DefaultSearchFilter, TableComponent, TableFeatures, UI } from 'junte-ui';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssueProblem, IssuesFilter, IssuesSummary, IssueState, IssuesType, PagingIssues } from '../../../models/issue';
import { IssuesGQL, IssuesSummaryGQL, SyncIssueGQL } from './issues.graphql';
import { R } from 'apollo-angular/types';
import { StandardLabel } from '../../../models/label';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';

export enum ViewType {
  default,
  extended
}

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  private team$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<string>(null);
  private project$ = new BehaviorSubject<string>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);
  private type$ = new BehaviorSubject<IssuesType>(IssuesType.opened);

  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  issuesType = IssuesType;
  viewType = ViewType;
  features = TableFeatures;
  standardLabel = StandardLabel;

  summary: IssuesSummary;
  progress = {summary: false, sync: false};

  typeControl = new FormControl(IssuesType.opened);

  form: FormGroup = this.formBuilder.group({
    type: this.typeControl
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

  @ViewChild('table', {static: true})
  table: TableComponent;

  @Output()
  filtered = new EventEmitter<{ type? }>();

  constructor(private issuesGQL: IssuesGQL,
              private issuesSummaryGQL: IssuesSummaryGQL,
              private syncIssueGQL: SyncIssueGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.type$.subscribe(type =>
      this.typeControl.patchValue(type, {emitEvent: false}));

    this.table.fetcher = (filter: DefaultSearchFilter) => {
      this.filter.q = filter.q;
      this.filter.first = filter.first;
      this.filter.offset = filter.offset;
      return this.issuesGQL.fetch(serialize(this.filter) as R)
        .pipe(map(({data: {issues}}) => deserialize(issues, PagingIssues)));
    };

    combineLatest(this.team$, this.user$, this.project$, this.dueDate$, this.type$, this.route.params)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, project, dueDate, type]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.project = project;
        this.filter.dueDate = dueDate;
        this.filter.state = type === IssuesType.opened ? IssueState.opened
          : (type === IssuesType.closed ? IssueState.closed : null);
        this.filter.problems = type === IssuesType.problems ? true : null;
        this.filter.orderBy = type === IssuesType.opened ? 'dueDate' : '-closedAt';

        this.loadSummary();
        this.table.load();
      });

    this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(({type}) => {
        const state: { type?, due_date?, project? } = {};
        if (type !== IssuesType.opened) {
          state.type = type;
        }
        if (!!this.filter.dueDate) {
          state.due_date = format(this.filter.dueDate, 'YYYY-MM-DD');
        }
        if (!!this.filter.project) {
          state.project = this.filter.project;
        }
        this.filtered.emit(state);
      });
  }

  private loadSummary() {
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

}
