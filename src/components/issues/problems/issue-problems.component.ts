import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {IssuesFilter, IssueState} from '../../../models/issue';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '../../../consts';
import {TableComponent} from '../../shared/table/table.component';
import {IIssuesService, issues_service} from '../../../services/issues/interface';
import {BehaviorSubject} from 'rxjs';
import {filter as filtering} from 'rxjs/operators';
import {IssueProblemsFilter, IssueProblemType} from '../../../models/problem';

@Component({
  selector: 'app-issue-problems',
  templateUrl: './issue-problems.component.html',
  styleUrls: ['./issue-problems.component.scss']
})
export class IssueProblemsComponent implements OnInit {

  issuesState = IssueState;
  issueProblemType = IssueProblemType;

  private user$ = new BehaviorSubject<number>(null);

  @Input()
  set user(user: number) {
    console.log(user);
    this.user$.next(user);
  }

  filter: IssueProblemsFilter = new IssueProblemsFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(issues_service) private issuesService: IIssuesService) {
  }

  ngOnInit() {
    this.user$.pipe(filtering(u => !!u))
      .subscribe((user) => {
        this.filter.user = user;
        this.table.fetcher = (filter: IssuesFilter) => this.issuesService.problems(Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
