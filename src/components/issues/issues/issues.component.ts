import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PLATFORM_DELAY } from 'src/consts';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { DefaultSearchFilter, TableComponent, UI } from 'junte-ui';
import { FormBuilder, FormGroup } from '@angular/forms';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssueProblem, IssuesFilter, IssueState, PagingIssues } from '../../../models/issue';
import { IssuesGQL, SyncIssueGQL } from './issues.graphql';
import { R } from 'apollo-angular/types';

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

  ui = UI;
  issuesState = IssueState;
  issueProblem = IssueProblem;
  viewType = ViewType;
  loading = false;

  @Input()
  view = ViewType.default;

  form: FormGroup = this.formBuilder.group({
    opened: [true],
    problems: [false]
  });

  private team$ = new BehaviorSubject<string>(null);
  private user$ = new BehaviorSubject<string>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);
  private opened$ = new BehaviorSubject<boolean>(true);
  private problems$ = new BehaviorSubject<boolean>(true);

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

  constructor(private formBuilder: FormBuilder,
              private issuesApollo: IssuesGQL,
              private syncIssueApollo: SyncIssueGQL) {
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
          return this.issuesApollo.fetch(serialize(this.filter) as R)
            .pipe(map(({data: {allIssues}}: { data: { allIssues } }) =>
              deserialize(allIssues, PagingIssues)));
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
    this.syncIssueApollo.mutate({id: issue})
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.table.load());
  }

}
