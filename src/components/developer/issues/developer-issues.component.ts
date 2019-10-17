import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { format } from 'date-fns';
import { UI } from 'junte-ui';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { distinctUntilChanged, filter as filtering, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MetricType } from 'src/components/leader/teams/team/calendar/team-calendar.component';
import { METRIC_TYPE } from 'src/components/metrics-type/consts';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { MergeRequestSummary } from 'src/models/merge-request';
import { MetricsGroup, UserMetricsFilter, UserProgressMetrics } from 'src/models/metrics';
import { MilestoneProblem } from 'src/models/milestone';
import { TimeExpensesSummary } from 'src/models/spent-time';
import { User } from 'src/models/user';
import { DurationFormat } from 'src/pipes/date';
import { IssuesMetricsGQL, IssuesSummaryGQL } from './issues-metrics.graphql';

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
  milestoneProblem = MilestoneProblem;
  metricType = MetricType;
  colors = [
    UI.colors.purple,
    UI.colors.red,
    UI.colors.green,
    UI.colors.yellow,
    UI.colors.teal,
    UI.colors.orange,
    UI.colors.purpleLight
  ];

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  formatDate = 'DD/MM/YYYY';

  summary: {
    issues?: IssuesSummary,
    mergeRequests?: MergeRequestSummary
    spentTimes?: TimeExpensesSummary
  } = {};

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
  project = new FormControl();
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.formBuilder.group({
    dueDate: this.dueDate,
    metric: this.metric,
    project: this.project
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private issuesSummary: IssuesSummaryGQL,
              private issuesMetricsGQL: IssuesMetricsGQL) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({dueDate, project}) => {
        const state: { due_date?, project? } = {};
        if (!!dueDate) {
          state.due_date = format(dueDate, 'YYYY-MM-DD');
        }

        if (!!project) {
          state.project = project.id;
        }

        this.router.navigate([state], {relativeTo: this.route});
      });

    this.route.data.subscribe(({user, dueDate, project}) => {
      this.user = user;
      this.form.patchValue({dueDate: dueDate, project: project}, {emitEvent: false});

      const filter = new IssuesFilter({
        user: user.id,
        dueDate: dueDate,
        project: !!project ? project.id : null
      });

      this.issuesSummary.fetch(serialize(filter) as R)
        .pipe(map(({data: {issues, mergeRequests, spentTimes}}) => ({
          issues: deserialize(issues, IssuesSummary),
          mergeRequests: deserialize(mergeRequests, MergeRequestSummary),
          spentTimes: deserialize(spentTimes, TimeExpensesSummary),
        })))
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
      return this.issuesMetricsGQL.fetch(serialize(filter) as R)
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
