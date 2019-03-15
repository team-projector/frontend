import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { IssuesFilter, IssueState } from 'src/models/issue';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/consts';
import { IIssuesService, issues_service } from 'src/services/issues/interface';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter as filtering } from 'rxjs/operators';
import { TableComponent } from 'junte-ui';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issuesState = IssueState;

  private user$ = new BehaviorSubject<number>(null);
  private dueDate$ = new BehaviorSubject<Date>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @Input()
  set dueDate(dueDate: Date) {
    this.dueDate$.next(dueDate);
  }

  filter: IssuesFilter = new IssuesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild(TableComponent)
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
