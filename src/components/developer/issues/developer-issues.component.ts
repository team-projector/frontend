import { Component, OnInit } from '@angular/core';
import {format, isFuture, isToday} from 'date-fns';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter as filtering, map } from 'rxjs/operators';
import { UserProgressMetrics } from 'src/models/metrics';
import { User } from 'src/models/user';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { UI } from 'junte-ui';
import { DurationFormat } from '../../../pipes/date';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MetricsGroup, UserMetricsFilter } from '../../../models/metrics';
import { MetricType } from '../../leader/teams/team/calendar/team-calendar.component';
import { IssuesSummaryGQL } from './issues-summary.graphql';
import { IssuesMetricsGQL } from './issues-metrics.graphql';
import { R } from 'apollo-angular/types';

class Metric {
  constructor(public days: Map<string, UserProgressMetrics>,
              public weeks: Map<string, UserProgressMetrics>) {
  }
}

@Component({
  selector: 'app-issues-list',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  metricType = MetricType;
  isFuture = isFuture;
  isToday = isToday;

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  format = format;
  formatDate = 'DD/MM/YYYY';

  summary: IssuesSummary;
  metric = MetricType.all;

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

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private issuesSummaryApollo: IssuesSummaryGQL,
              private issuesMetricsApollo: IssuesMetricsGQL) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(filter => {
          const state: { due_date? } = {};
          if (!!filter.dueDate) {
            state.due_date = format(filter.dueDate, 'MM-DD-YYYY');
          }
          this.router.navigate([state], {relativeTo: this.route});
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

      this.issuesSummaryApollo.fetch(serialize(filter) as R)
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
      return this.issuesMetricsApollo.fetch(serialize(filter) as R)
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
