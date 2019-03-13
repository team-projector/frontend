import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/consts';
import { ITimeExpensesService, time_expenses_service } from 'src/services/time-expenses/interface';
import { Moment } from 'moment';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter as filtering } from 'rxjs/operators';
import { TimeExpensesFilter } from 'src/models/spent-time';
import { IssueState } from 'src/models/issue';
import { TableComponent } from 'junte-ui';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  issuesState = IssueState;

  private user$ = new BehaviorSubject<number>(null);
  private date$ = new BehaviorSubject<Moment>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @Input()
  set date(date: Moment) {
    this.date$.next(date);
  }

  filter: TimeExpensesFilter = new TimeExpensesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild(TableComponent)
  table: TableComponent;

  constructor(@Inject(time_expenses_service) private timeExpensesService: ITimeExpensesService) {
  }

  ngOnInit() {
    combineLatest(this.user$, this.date$)
      .pipe(filtering(u => !!u))
      .subscribe(([user, date]) => {
        this.filter.user = user;
        this.filter.date = date;
        this.table.fetcher = (filter: TimeExpensesFilter) =>
          this.timeExpensesService.list(Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}