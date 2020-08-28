import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { R } from 'apollo-angular/types';
import { Period, UI } from '@junte/ui';
import { BehaviorSubject, combineLatest, of, zip } from 'rxjs';
import { delay, distinctUntilChanged, filter as filtering, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { METRIC_TYPE } from 'src/components/metrics-type/consts';
import { DATE_FORMAT, MOCKS_DELAY } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { MilestoneProblem } from 'src/models/enums/milestone';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';
import { MergeRequestSummary } from 'src/models/merge-request';
import { SpentTimesSummary } from 'src/models/spent-time';
import { User, UserMetricsFilter, UserProgressMetrics } from 'src/models/user';
import { DateSerializer } from 'src/serializers/date';
import { getMock } from 'src/utils/mocks';
import { TeamState } from '../../leader/teams/team/issues/team-issues.component';
import { IssuesMetricsGQL, IssuesSummaryGQL } from './issues-metrics.graphql';
import { Project } from '../../../models/project';

class Metric {
  constructor(public days: Map<string, UserProgressMetrics>,
              public weeks: Map<string, UserProgressMetrics>) {
  }
}

@model()
export class DeveloperState {

  @field()
  project?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  constructor(defs: TeamState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Component({
  selector: 'app-developer-issues',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent implements OnInit {

  private user$ = new BehaviorSubject<User>(null);
  private period$ = new BehaviorSubject<Period>(null);
  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;
  metricType = MetricType;
  colors = [
    UI.color.purple,
    UI.color.red,
    UI.color.green,
    UI.color.yellow,
    UI.color.teal,
    UI.color.orange,
    UI.color.purpleLight
  ];

  formatDate = 'dd/MM/yyyy';
  project: Project;
  filter: IssuesFilter;

  summary: {
    issues?: IssuesSummary,
    mergeRequests?: MergeRequestSummary
    spentTimes?: SpentTimesSummary
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

  get period() {
    return this.period$.getValue();
  }

  metrics = new Metric(
    new Map<string, UserProgressMetrics>(),
    new Map<string, UserProgressMetrics>()
  );
  dueDateControl = new FormControl(new Date());
  projectControl = this.formBuilder.control(null);
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.formBuilder.group({
    dueDate: this.dueDateControl,
    project: this.projectControl,
    metric: this.metric
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
        const state = new DeveloperState({
          project: project || undefined,
          dueDate: dueDate || undefined
        });
        const path = [];
        this.route.snapshot.children.forEach(child =>
          child.url.forEach(segment => path.push(segment.path)));
        this.router.navigate([serialize(state), ...path],
          {relativeTo: this.route}).then(() => null);
      });

    combineLatest([this.route.data, this.route.params])
      .subscribe(([{user, project}, {dueDate}]) => {
        [this.user, this.project] = [user, project];

        this.filter = new IssuesFilter({
          user: user.id,
          dueDate: !!dueDate ? new Date(dueDate) : null,
          project: project?.id || null
        });

        this.form.patchValue(this.filter, {emitEvent: false});
        this.loadSummary();
      });

    combineLatest([this.user$, this.period$])
      .pipe(filtering(([user, period]) => !!user && !!period))
      .subscribe(() => this.loadMetrics());
  }

  private loadSummary() {
    (environment.mocks
        ? of({
          issues: getMock(IssuesSummary),
          mergeRequests: getMock(MergeRequestSummary),
          spentTimes: getMock(SpentTimesSummary)
        }).pipe(delay(MOCKS_DELAY))
        : this.issuesSummary.fetch(serialize(this.filter) as R)
          .pipe(map(({data: {issues, mergeRequests, spentTimes}}) => ({
            issues: deserialize(issues, IssuesSummary),
            mergeRequests: deserialize(mergeRequests, MergeRequestSummary),
            spentTimes: deserialize(spentTimes, SpentTimesSummary),
          })))
    ).subscribe(summary => this.summary = summary);
  }

  private loadMetrics() {
    const getMetric = (group: Metrics) => {
      const filter = new UserMetricsFilter({
        user: this.user.id,
        start: this.period.start,
        end: this.period.end,
        group: group
      });

      return (environment.mocks
        ? of(Array.apply(null, Array(20))
          .map(() => getMock(UserProgressMetrics, filter)))
          .pipe(delay(MOCKS_DELAY))
        : this.issuesMetricsGQL.fetch(serialize(filter) as R)
          .pipe(map(({data: {userProgressMetrics}}) =>
            userProgressMetrics.map(el => deserialize(el, UserProgressMetrics)))))
        .pipe(map(metrics => {
          const dic = new Map<string, UserProgressMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          return dic;
        }));
    };

    zip(getMetric(Metrics.day), getMetric(Metrics.week))
      .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
  }

  onActivate(component) {
    if (!!component.reloaded) {
      component.reloaded.subscribe(() => {
        this.loadSummary();
        this.loadMetrics();
      });
    }
  }
}
