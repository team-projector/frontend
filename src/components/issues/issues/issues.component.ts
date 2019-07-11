import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PLATFORM_DELAY} from 'src/consts';
import {IIssuesService, issues_service} from 'src/services/issues/interface';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, map} from 'rxjs/operators';
import {DefaultSearchFilter, TableComponent, UI} from 'junte-ui';
import {FormBuilder, FormGroup} from '@angular/forms';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize} from 'serialize-ts/dist';
import {IssueProblem, IssueState} from '../../../models/issue';
import {PagingIssues, IssuesFilter} from './model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  loading = false;

  form: FormGroup = this.formBuilder.group({
    opened: [true],
    problems: [false]
  });

  private query = {
    issues: [
      'count',
      {
        edges: [
          {
            node: [
              'title',
              'id',
              'dueDate',
              {
                labels: [
                  'count',
                  {edges: [{node: ['title', 'color']}]}]
              },
              {'project': ['fullTitle']},
              'state',
              'createdAt',
              'totalTimeSpent',
              'glUrl',
              {user: ['id', 'name', 'glAvatar']},
              {
                participants: [
                  'count',
                  {edges: [{node: ['name', 'glAvatar']}]}
                ]
              },
              'problems',
              {
                'metrics': [
                  'remains',
                  'efficiency',
                  'payroll',
                  'paid'
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  private team$ = new BehaviorSubject<number>(null);
  private user$ = new BehaviorSubject<number>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);
  private opened$ = new BehaviorSubject<boolean>(true);
  private problems$ = new BehaviorSubject<boolean>(true);

  @Input()
  set team(team: number) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  @Input()
  set dueDate(dueDate: Date) {
    this.dueDate$.next(dueDate);
  }

  get dueDate() {
    return this.dueDate$.getValue();
  }

  @Input()
  set opened(opened: boolean) {
    this.opened$.next(opened);
  }

  get opened() {
    return this.opened$.getValue();
  }

  @Input()
  set problems(problems: boolean) {
    this.problems$.next(problems);
  }

  get problems() {
    return this.problems$.getValue();
  }

  filter: IssuesFilter = new IssuesFilter();

  @ViewChild('table')
  table: TableComponent;

  @Output()
  filtered = new EventEmitter<{ opened?, problems? }>();

  constructor(@Inject(issues_service) private issuesService: IIssuesService,
              @Inject(graph_ql_service) private graphQL: IGraphQLService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    combineLatest(this.opened$, this.problems$)
      .subscribe(([opened, problems]) => {
        this.form.patchValue({
          opened: opened,
          problems: problems
        }, {emitEvent: false});
      });

    combineLatest(this.team$, this.user$, this.dueDate$, this.opened$, this.problems$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, dueDate, opened, problems]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.dueDate = dueDate;
        this.filter.state = opened ? IssueState.opened : null;
        this.filter.problems = problems ? problems : null;
        this.table.fetcher = (filter: DefaultSearchFilter) => {
          Object.assign(this.filter, filter);
          return this.graphQL.get({
            operation: 'allIssues',
            variables: this.filter,
            fields: this.query.issues
          }).pipe(map(({data: {issues}}: { data: { issues } }) =>
            deserialize(issues, PagingIssues)));
        };
        this.table.load();
      });

    this.form.valueChanges.subscribe(({opened, problems}) => {
      [this.opened, this.problems] = [opened, problems];
      const state: { opened?, problems? } = {};
      if (!opened) {
        state.opened = false;
      }
      if (problems) {
        state.problems = true;
      }
      this.filtered.emit(state);
    });
  }

  sync(issue: number) {
    this.loading = true;
    this.issuesService.sync(issue)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.table.load());
  }

}
