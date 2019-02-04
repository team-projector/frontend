import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {IssuesFilter, IssueState} from '../../../models/issue';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '../../../consts';
import {TableComponent} from '../../shared/table/table.component';
import {IIssuesService, issues_service} from '../../../services/issues/interface';
import {Moment} from 'moment';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {filter as filtering} from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issuesState = IssueState;

  private user$ = new BehaviorSubject<number>(null);
  private dueDate$ = new BehaviorSubject<Moment>(null);

  @Input()
  set user(user: number) {
    console.log(user);
    this.user$.next(user);
  }

  @Input()
  set dueDate(dueDate: Moment) {
    this.dueDate$.next(dueDate);
  }

  filter: IssuesFilter = new IssuesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(issues_service) private issuesService: IIssuesService) {
  }

  ngOnInit() {
    combineLatest(this.user$, this.dueDate$)
      .pipe(filtering(u => !!u))
      .subscribe(([user, dueDate]) => {
        this.filter.user = user;
        this.filter.dueDate = dueDate;
        this.table.fetcher = (filter: IssuesFilter) => this.issuesService.list(Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
