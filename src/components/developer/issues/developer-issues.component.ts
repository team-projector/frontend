import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { format, isFuture, isToday } from 'date-fns';
import { UI } from 'junte-ui';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { distinctUntilChanged, filter as filtering, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MetricType } from 'src/components/leader/teams/team/calendar/team-calendar.component';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { MetricsGroup, UserMetricsFilter, UserProgressMetrics } from 'src/models/metrics';
import { User } from 'src/models/user';
import { DurationFormat } from 'src/pipes/date';
import { IssuesMetricsGQL } from './issues-metrics.graphql';
import { IssuesSummaryGQL } from './issues-summary.graphql';

class Metric {
  constructor(public days: Map<string, UserProgressMetrics>,
              public weeks: Map<string, UserProgressMetrics>) {
  }
}

@Component({
  selector: 'app-developer-issues',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  metricType = MetricType;
  isFuture = isFuture;
  isToday = isToday;
  format = format;

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

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
  metric = new FormControl(MetricType.all);
  form = this.formBuilder.group({
    dueDate: this.dueDate,
    metric: this.metric
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private issuesSummary: IssuesSummaryGQL,
              private issuesMetrics: IssuesMetricsGQL) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(filter => {
          const state: { due_date?, metric? } = {};
          if (!!filter.dueDate) {
            state.due_date = format(filter.dueDate, 'MM-DD-YYYY');
          }
          this.router.navigate([state], {relativeTo: this.route});
        }
      );

    this.route.data.subscribe(({user, dueDate}) => {
      this.user = user;
      this.form.patchValue({dueDate: dueDate}, {emitEvent: false});

      // const filter = new IssuesFilter({
      //   user: user.id,
      //   dueDate: dueDate
      // });
      //
      // this.issuesSummaryApollo.fetch(serialize(filter) as R)
      //   .pipe(map(({data: {issuesSummary}}: { data: { issuesSummary } }) =>
      //     deserialize(issuesSummary, IssuesSummary)))
      //   .subscribe(summary => this.summary = summary);
    });

    this.route.params.subscribe(() => {
      console.log('calc summary');
      const filter = new IssuesFilter({
        user: this.user.id,
        dueDate: this.form.get('dueDate').value
      });

      this.issuesSummary.fetch(serialize(filter) as R)
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
      return this.issuesMetrics.fetch(serialize(filter) as R)
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
