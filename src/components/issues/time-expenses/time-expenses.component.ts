import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PLATFORM_DELAY} from 'src/consts';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {TimeExpensesFilter} from 'src/models/graphql/spent-time';
import {IssueState} from 'src/models/issue';
import {DefaultSearchFilter, TableComponent, UI} from 'junte-ui';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize, serialize} from 'serialize-ts/dist';
import {PagingTimeExpenses} from '../../../models/graphql/spent-time';

const query = {
  spent: `query ($team: ID, $user: ID, $salary: ID, $date: Date, $offset: Int, $first: Int) {
  allSpentTimes(team: $team, user: $user, salary: $salary, date: $date, offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        createdAt
        date
        owner {
          __typename
          title
          labels {
            count
            edges {
              node {
                title
                color
              }
            }
          }
          glUrl
          project {
            fullTitle
          }
        }
        timeSpent
        sum
      }
    }
  }
}`
};

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
  private salary$ = new BehaviorSubject<number>(null);

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

  @Input()
  set salary(salary: number) {
    this.salary$.next(salary);
  }

  filter: TimeExpensesFilter = new TimeExpensesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  ngOnInit() {
    combineLatest(this.team$, this.user$, this.date$, this.salary$)
      .pipe(debounceTime(PLATFORM_DELAY), distinctUntilChanged())
      .subscribe(([team, user, date, salary]) => {
        this.filter.team = team;
        this.filter.user = user;
        this.filter.date = date;
        this.filter.salary = salary;
        this.table.fetcher = (filter: DefaultSearchFilter) => {
          Object.assign(this.filter, filter);
          return this.graphQL.get(query.spent, serialize(this.filter))
            .pipe(map(({data: {allSpentTimes}}) =>
              deserialize(allSpentTimes, PagingTimeExpenses)));
        };

        this.table.load();
      });
  }

}
