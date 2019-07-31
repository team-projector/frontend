import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Team, TeamMember } from 'src/models/team';
import { UI } from 'junte-ui';
import { addDays, addWeeks, endOfDay, endOfWeek, format, isEqual, isFuture, isPast, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { distinctUntilChanged, filter as filtering, finalize, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { MetricsGroup } from 'src/models/metrics';
import { DurationFormat } from 'src/pipes/date';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { User, UserProblem } from 'src/models/user';
import { equals } from '../../../../utils/equals';
import { deserialize, serialize } from 'serialize-ts/dist';
import { PagingTeamMembers } from '../../../../../models/team';
import { TeamMetricsFilter, TeamProgressMetrics, UserProgressMetrics } from '../../../../../models/metrics';
import { CalendarMembersGQL, CalendarMetricsGQL } from './team-calendar.graphql';
import { R } from 'apollo-angular/types';

const DAYS_IN_WEEK = 7;
const L = 'DD/MM/YYYY';

export enum MetricType {
  all = 'all',
  spent = 'spent',
  estimate = 'estimate',
  remains = 'Remains',
  loading = 'Loading'
}

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
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeamCalendarComponent),
      multi: true
    }
  ]
})

export class TeamCalendarComponent implements OnInit, ControlValueAccessor {

  ui = UI;
  userProblem = UserProblem;
  subWeeks = subWeeks;
  addWeeks = addWeeks;
  isEqual = isEqual;
  isPast = isPast;
  isFuture = isFuture;
  format = format;
  endOfDay = endOfDay;
  formatDate = L;
  durationFormat = DurationFormat;
  metricType = MetricType;
  today = startOfDay(new Date());

  private team$ = new BehaviorSubject<Team>(null);
  private start$ = new BehaviorSubject<Date>(null);
  private _date: Date;

  days: Date[] = [];
  metrics: Metric;
  loading: boolean;

  user = new FormControl();
  dueDate = new FormControl();
  metric = new FormControl();

  form: FormGroup = this.fb.group({
    dueDate: this.dueDate,
    user: this.user,
    metric: this.metric
  });

  members: TeamMember[] = [];

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

  constructor(private calendarMember: CalendarMembersGQL,
              private calendarMetrics: CalendarMetricsGQL,
              private fb: FormBuilder,
              public router: Router) {
    this.team$.pipe(filtering(t => !!t))
      .subscribe(() => this.loadMembers());

    this.date = new Date();
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => this.onChange(f));

    combineLatest(this.team$, this.start$)
      .pipe(filtering(([team, start]) => !!team && !!start))
      .subscribe(() => this.loadMetrics());
  }

  private loadMetrics() {
    const getMetric = (group: MetricsGroup) => {
      const filter = new TeamMetricsFilter({
        team: this.team.id,
        start: this.start,
        end: endOfWeek(this.start, {weekStartsOn: 1}),
        group: group
      });
      return this.calendarMetrics.fetch(serialize(filter) as R)
        .pipe(map(({data: {teamProgressMetrics}}) =>
            teamProgressMetrics.map(el => deserialize(el, TeamProgressMetrics))),
          map(metrics => {
            const dic = new Map<string, Map<string, UserProgressMetrics>>();
            metrics.forEach(m => {
              const userDic = new Map<string, UserProgressMetrics>();
              m.metrics.forEach(metric => userDic.set(metric.getKey(), metric));
              dic.set(m.user.id.toString(), userDic);
            });
            return dic;
          }));
    };

    zip(getMetric(MetricsGroup.day), getMetric(MetricsGroup.week))
      .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
  }

  private loadMembers() {
    this.loading = true;
    this.calendarMember.fetch({team: this.team.id} as R)
      .pipe(map(({data: {team: {members}}}) =>
        deserialize(members, PagingTeamMembers)), finalize(() => this.loading = false))
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

  writeValue(value: UserFilter) {
    if (!isUndefined(value)) {
      this.form.patchValue({
        user: value.user, dueDate: value.dueDate
      }, {emitEvent: false});
    }
  }

  onChange(value: UserFilter) {
  }

  onTouched() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
