import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { addDays, addWeeks, endOfWeek, getDate, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { UI } from '@junte/ui';
import { BehaviorSubject, combineLatest, of, zip } from 'rxjs';
import { delay, distinctUntilChanged, filter as filtering, finalize, map, tap } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { UserProblem } from 'src/models/enums/user';
import { PagingTeamMembers, Team, TeamMember, TeamMemberProgressMetrics, TeamMetricsFilter } from 'src/models/team';
import { User, UserProgressMetrics } from 'src/models/user';
import { equals } from 'src/utils/equals';
import { getMock } from 'src/utils/mocks';
import { METRIC_TYPE } from '../../../../../shared/metrics-type/consts';
import { TeamMembersGQL, TeamMetricsGQL } from './team-progress.graphql';

const DAYS_IN_WEEK = 7;
const DAYS_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const L = 'dd/MM/yyyy';

export class UserFilter {
  user: User;
  dueDate: Date;
}

class Metric {
  constructor(public days: Map<string, Map<string, UserProgressMetrics>>,
              public weeks: Map<string, Map<string, UserProgressMetrics>>) {
  }
}

@Component({
  selector: 'app-team-progress',
  templateUrl: './team-progress.component.html',
  styleUrls: ['./team-progress.component.scss']
})

export class TeamProgressComponent implements OnInit {

  ui = UI;
  userProblem = UserProblem;
  subWeeks = subWeeks;
  addWeeks = addWeeks;
  getDate = getDate;
  formatDate = L;
  durationFormat = DurationFormat;
  metricType = MetricType;
  today = startOfDay(new Date());
  daysOfWeek = DAYS_WEEK;

  private team$ = new BehaviorSubject<Team>(null);
  private start$ = new BehaviorSubject<Date>(null);
  private _date: Date;

  days: Date[] = [];
  members: TeamMember[] = [];
  metrics: Metric;
  loading: boolean;

  metricControl = this.fb.control(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form: FormGroup = this.fb.group({
    metric: this.metricControl
  });

  @Input()
  metric: MetricType;

  @Input()
  set team(team: Team) {
    if (!equals(this.team, team)) {
      this.team$.next(team);
    }
  }

  get team() {
    return this.team$.getValue();
  }

  set date(date: Date) {
    this._date = date;
    this.update();
  }

  get date() {
    return this._date;
  }

  set start(start: Date) {
    this.start$.next(start);
  }

  get start() {
    return this.start$.getValue();
  }

  @Output()
  selected = new EventEmitter<{ user: string, dueDate: Date }>();

  constructor(private calendarMember: TeamMembersGQL,
              private calendarMetrics: TeamMetricsGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.date = new Date();
    this.team$.pipe(filtering(t => !!t))
      .subscribe(() => this.loadMembers());

    combineLatest(this.team$, this.start$)
      .pipe(filtering(([team, start]) => !!team && !!start))
      .subscribe(() => this.loadMetrics());
  }

  private loadMetrics() {
    const getMetric = (group: Metrics) => {
      const filter = new TeamMetricsFilter({
        team: this.team.id,
        start: this.start,
        end: endOfWeek(this.start, {weekStartsOn: 1}),
        group: group
      });
      return (environment.mocks
        ? of(Array.apply(null, Array(10))
          .map((v, i) => getMock(TeamMemberProgressMetrics, filter, i))).pipe(delay(MOCKS_DELAY))
        : this.calendarMetrics.fetch(serialize(filter) as R)
          .pipe(filtering(({data: {metrics}}) => !!metrics),
            map(({data: {metrics}}) => metrics.map(el => deserialize(el, TeamMemberProgressMetrics)))))
        .pipe(map(metrics => {
          const dic = new Map<string, Map<string, UserProgressMetrics>>();
          metrics.forEach(m => {
            const userDic = new Map<string, UserProgressMetrics>();
            m.metrics.forEach(metric => userDic.set(metric.getKey(), metric));
            dic.set(m.user.id.toString(), userDic);
          });

          return dic;
        }));
    };

    zip(getMetric(Metrics.day), getMetric(Metrics.week))
      .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
  }

  private loadMembers() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingTeamMembers)).pipe(delay(MOCKS_DELAY))
      : this.calendarMember.fetch({team: this.team.id} as R)
        .pipe(map(({data: {team: {members}}}) => deserialize(members, PagingTeamMembers))))
      .pipe(finalize(() => this.loading = false))
      .subscribe(teams => this.members = teams.results);
  }

  private update() {
    // TODO: use week starts on from locale
    this.start = startOfWeek(this.date, {weekStartsOn: 1});
    this.days = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      this.days[i] = addDays(this.start, i);
    }
  }

}