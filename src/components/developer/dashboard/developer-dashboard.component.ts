import {Component, Inject, OnInit} from '@angular/core';
import {format} from 'date-fns';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, filter as filtering, map} from 'rxjs/operators';
import {UserProgressMetrics} from 'src/models/graphql/user-progress-metrics';
import {User} from 'src/models/user';
import {BehaviorSubject, combineLatest, zip} from 'rxjs';
import {Period} from 'junte-ui/lib/components/calendar/models';
import {UI} from 'junte-ui';
import {DurationFormat} from '../../../pipes/date';
import {IssuesFilter, IssuesSummary} from 'src/models/graphql/issue';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize, serialize} from 'serialize-ts/dist';
import {UserMetricsFilter} from '../../../models/graphql/user-progress-metrics';
import {MetricsGroup} from '../../../models/graphql/user-progress-metrics';

const query = {
  summary: `query ($user: ID, $dueDate: Date, $state: String) {
  issuesSummary(user: $user, dueDate: $dueDate, state: $state) {
    issuesCount
    timeSpent
    problemsCount
  }
}`,
  metrics: `query ($user: ID!, $start: Date!, $end: Date!, $group: String!) {
  userProgressMetrics(user: $user, start: $start, end: $end, group: $group) {
    start
    end
    timeEstimate
    timeSpent
    timeRemains
    plannedWorkHours
    loading
    payroll
    paid
    issuesCount
  }
}`
};

class Metric {
  constructor(public days: Map<string, UserProgressMetrics>,
              public weeks: Map<string, UserProgressMetrics>) {
  }
}

@Component({
  selector: 'app-issues-list',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  format = format;
  formatDate = 'DD/MM/YYYY';

  summary: IssuesSummary;

  set user(user: User) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  set period(period: Period) {
    this.period$.next(period);
  }

  metrics = new Metric(
    new Map<string, UserProgressMetrics>(),
    new Map<string, UserProgressMetrics>()
  );
  dueDate = new FormControl();
  form = this.formBuilder.group({dueDate: this.dueDate});

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(filter => {
          const state: { due_date? } = {};
          if (!!filter.dueDate) {
            state.due_date = format(filter.dueDate, 'MM-DD-YYYY');
          }
          this.router.navigate([state, 'issues'], {relativeTo: this.route});
        }
      );

    this.route.data.subscribe(({user, dueDate}) => {
      this.user = user;
      this.form.patchValue({dueDate: dueDate},
        {emitEvent: false});

      const filter = new IssuesFilter({
        user: user.id,
        dueDate: dueDate
      });

      this.graphQL.get(query.summary, serialize(filter))
        .pipe(map(({data: {issuesSummary}}: { data: { issuesSummary } }) =>
          deserialize(issuesSummary, IssuesSummary)))
        .subscribe(summary => this.summary = summary);
    });

    combineLatest(this.user$, this.period$)
      .pipe(filtering(([user, period]) => !!user && !!period))
      .subscribe(([user, period]) => this.loadMetrics(user, period));
  }

  private loadMetrics(user: User, period: Period) {
    const getMetric = (group: MetricsGroup) => {
      const filter = new UserMetricsFilter({
        user: user.id,
        start: period.start,
        end: period.end,
        group: group
      });
      return this.graphQL.get(query.metrics, serialize(filter))
        .pipe(map(({data: {userProgressMetrics}}) =>
            userProgressMetrics.map(el => deserialize(el, UserProgressMetrics))),
          map(metrics => {
            const dic = new Map<string, UserProgressMetrics>();
            metrics.forEach(m => dic.set(m.getKey(), m));
            return dic;
          }));
    };

    zip(getMetric(MetricsGroup.day), getMetric(MetricsGroup.week))
      .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
  }

}
