import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {IssuesFilter, IssueState} from 'src/models/issue';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from 'src/consts';
import {IIssuesService, issues_service} from 'src/services/issues/interface';
import {BehaviorSubject} from 'rxjs';
import {filter as filtering} from 'rxjs/operators';
import {IssueProblemsFilter, IssueProblemType} from 'src/models/problem';
import {TableComponent, UI} from 'junte-ui';

@Component({
  selector: 'app-issue-problems',
  templateUrl: './issue-problems.component.html',
  styleUrls: ['./issue-problems.component.scss']
})
export class IssueProblemsComponent implements OnInit {

  ui = UI;

  issuesState = IssueState;
  issueProblemType = IssueProblemType;

  private user$ = new BehaviorSubject<number>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  filter: IssueProblemsFilter = new IssueProblemsFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild(TableComponent)
  table: TableComponent;

  constructor(@Inject(issues_service) private issuesService: IIssuesService) {
  }

  ngOnInit() {
    this.user$.pipe(filtering(u => !!u))
      .subscribe((user) => {
        this.table.fetcher = (filter: IssuesFilter) => this.issuesService.problemsForUser(user, Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
