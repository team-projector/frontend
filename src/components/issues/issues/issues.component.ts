import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {IssuesFilter, IssueState} from 'src/models/issue';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PLATFORM_DELAY} from 'src/consts';
import {IIssuesService, issues_service} from 'src/services/issues/interface';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter as filtering} from 'rxjs/operators';
import {TableComponent, UI} from 'junte-ui';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  ui = UI;

  issuesState = IssueState;

  private team$ = new BehaviorSubject<number>(null);
  private user$ = new BehaviorSubject<number>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);

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

  filter: IssuesFilter = new IssuesFilter();

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(issues_service) private issuesService: IIssuesService) {
  }

  ngOnInit() {
    combineLatest(this.team$, this.user$, this.dueDate$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, dueDate]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.dueDate = dueDate;
        this.table.fetcher = (filter: IssuesFilter) =>
          this.issuesService.list(Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
