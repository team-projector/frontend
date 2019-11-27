import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {R} from 'apollo-angular/types';
import {UI} from 'junte-ui';
import {Period} from 'junte-ui/lib/components/calendar/models';
import {BehaviorSubject, combineLatest, zip} from 'rxjs';
import {distinctUntilChanged, filter as filtering, map} from 'rxjs/operators';
import {deserialize, serialize} from 'serialize-ts/dist';
import {MetricType} from 'src/components/leader/teams/team/calendar/team-calendar.component';
import {METRIC_TYPE} from 'src/components/metrics-type/consts';
import {IssuesFilter, IssuesSummary} from 'src/models/issue';
import {MergeRequestSummary} from 'src/models/merge-request';
import {MetricsGroup, UserMetricsFilter, UserProgressMetrics} from 'src/models/metrics';
import {MilestoneProblem} from 'src/models/milestone';
import {SpentTimesSummary} from 'src/models/spent-time';
import {User} from 'src/models/user';
import {DurationFormat} from 'src/pipes/date';
import {IssuesMetricsGQL, IssuesSummaryGQL} from './issues-metrics.graphql';
import {field, model} from '@junte/mocker-library';
import {DateSerializer} from '../../../serializers/date';
import {DATE_FORMAT} from '../../../consts';
import {TeamState} from '../../leader/teams/team/team.component';

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
    UI.colors.purple,
    UI.colors.red,
    UI.colors.green,
    UI.colors.yellow,
    UI.colors.teal,
    UI.colors.orange,
    UI.colors.purpleLight
  ];

  formatDate = 'DD/MM/YYYY';
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
  dueDate = new FormControl();
  project = new FormControl();
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.formBuilder.group({
    dueDate: this.dueDate,
    project: this.project,
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
          project: !!project ? project.id : undefined,
          dueDate: dueDate || undefined
        });
        const path = [];
        this.route.snapshot.children.forEach(child =>
          child.url.forEach(segment => path.push(segment.path)));
        this.router.navigate([serialize(state), ...path],
          {relativeTo: this.route}).then(() => null);
      });

    this.route.data.subscribe(({user, dueDate, project}) => {
      this.user = user;
      this.form.patchValue({dueDate: dueDate, project: project}, {emitEvent: false});

      this.filter = new IssuesFilter({
        user: user.id,
        dueDate: dueDate,
        project: !!project ? project.id : null
      });

      this.loadSummary();
    });

    combineLatest([this.user$, this.period$])
      .pipe(filtering(([user, period]) => !!user && !!period))
      .subscribe(() => this.loadMetrics());
  }

  private loadSummary() {
    this.issuesSummary.fetch(serialize(this.filter) as R)
      .pipe(map(({data: {issues, mergeRequests, spentTimes}}) => ({
          issues: deserialize(issues, IssuesSummary),
          mergeRequests: deserialize(mergeRequests, MergeRequestSummary),
          spentTimes: deserialize(spentTimes, SpentTimesSummary),
        }))
      ).subscribe(summary => this.summary = summary);
  }

  private loadMetrics() {
    const getMetric = (group: MetricsGroup) => {
      const filter = new UserMetricsFilter({
        user: this.user.id,
        start: this.period.start,
        end: this.period.end,
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

  onActivate(component) {
    if (!!component.reloaded) {
      component.reloaded.subscribe(() => {
        this.loadSummary();
        this.loadMetrics();
      });
    }
  }
}
