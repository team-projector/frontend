import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '../../../consts';
import {TableComponent} from '../../shared/table/table.component';
import {ITimeExpensesService, time_expenses_service} from '../../../services/time-expenses/interface';
import {Moment} from 'moment';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {filter as filtering} from 'rxjs/operators';
import {TimeExpensesFilter} from '../../../models/spent-time';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  private user$ = new BehaviorSubject<number>(null);
  private createdAt$ = new BehaviorSubject<Moment>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @Input()
  set createdAt(createdAt: Moment) {
    this.createdAt$.next(createdAt);
  }

  filter: TimeExpensesFilter = new TimeExpensesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(time_expenses_service) private timeExpensesService: ITimeExpensesService) {
  }

  ngOnInit() {
    combineLatest(this.user$, this.createdAt$)
      .pipe(filtering(u => !!u))
      .subscribe(([user, createdAt]) => {
        this.table.fetcher = (filter: TimeExpensesFilter) => this.timeExpensesService.list(filter);
        this.filter.user = user;
        this.filter.createdAt = createdAt;
        if (!!user) {
          this.table.load();
        }
      });
  }

}
