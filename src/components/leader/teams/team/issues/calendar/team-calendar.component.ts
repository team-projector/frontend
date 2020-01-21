import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { R } from 'apollo-angular/types';
import { addDays, addWeeks, endOfWeek, getDate, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { UI } from 'junte-ui';
import { BehaviorSubject, combineLatest, of, zip } from 'rxjs';
import { delay, distinctUntilChanged, filter as filtering, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { UserProblem } from 'src/models/enums/user';
import { TeamMetricsFilter, TeamProgressMetrics, UserProgressMetrics } from 'src/models/metrics';
import { PagingTeamMembers, Team, TeamMember } from 'src/models/team';
import { User } from 'src/models/user';
import { equals } from 'src/utils/equals';
import { getMock } from 'src/utils/mocks';
import { CalendarMembersGQL, CalendarMetricsGQL } from './team-calendar.graphql';

const DAYS_IN_WEEK = 7;
const DAYS_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const L = 'DD/MM/YYYY';

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

  user = new FormControl();
  dueDate = new FormControl();

  form: FormGroup = this.fb.group({
    dueDate: this.dueDate,
    user: this.user
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

  constructor(private calendarMember: CalendarMembersGQL,
              private calendarMetrics: CalendarMetricsGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.date = new Date();
    this.team$.pipe(filtering(t => !!t))
      .subscribe(() => this.loadMembers());

    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => this.onChange(f));

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
        ? of(getMock(TeamProgressMetrics)).pipe(delay(MOCKS_DELAY))
        : this.calendarMetrics.fetch(serialize(filter) as R).pipe(
          filtering(({data: {teamProgressMetrics}}) => !!teamProgressMetrics),
          map(({data: {teamProgressMetrics}}) => teamProgressMetrics.map(el => deserialize(el, TeamProgressMetrics))))).pipe(
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

  writeValue(value: UserFilter) {
    if (value !== undefined) {
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
