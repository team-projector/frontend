import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PLATFORM_DELAY} from 'src/consts';
import {ITimeExpensesService, time_expenses_service} from 'src/services/time-expenses/interface';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter as filtering} from 'rxjs/operators';
import {TimeExpensesFilter} from 'src/models/spent-time';
import {IssueState} from 'src/models/issue';
import {TableComponent, UI} from 'junte-ui';

@Component({
  selector: 'app-time-expenses',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})
export class TimeExpensesComponent implements OnInit {

  ui = UI;

  issuesState = IssueState;

  private user$ = new BehaviorSubject<number>(null);
  private team$ = new BehaviorSubject<number>(null);
  private date$ = new BehaviorSubject<Date>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  @Input()
  set team(team: number) {
    this.team$.next(team);
  }

  @Input()
  set date(date: Date) {
    this.date$.next(date);
  }

  filter: TimeExpensesFilter = new TimeExpensesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  // TODO: @ViewChild(TableComponent) == undefined in AOT
  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(time_expenses_service) private timeExpensesService: ITimeExpensesService) {
  }

  ngOnInit() {
    combineLatest(this.team$, this.user$, this.date$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, date]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.date = date;
        this.table.fetcher = (filter: TimeExpensesFilter) =>
          this.timeExpensesService.list(user, Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
