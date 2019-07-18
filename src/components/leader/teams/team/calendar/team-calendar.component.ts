import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Team, TeamMember} from 'src/models/team';
import {UI} from 'junte-ui';
import {addDays, addWeeks, endOfDay, format, isEqual, isFuture, isPast, startOfDay, startOfWeek, subWeeks} from 'date-fns';
import {distinctUntilChanged, filter as filtering, finalize, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, zip} from 'rxjs';
import {MetricsGroup} from 'src/models/metrics';
import {DurationFormat} from 'src/pipes/date';
import {Period} from 'junte-ui/lib/components/calendar/models';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {User, UserProblem} from 'src/models/user';
import {equals} from '../../../../utils/equals';
import {graph_ql_service, IGraphQLService} from '../../../../../services/graphql/interface';
import {deserialize, serialize} from 'serialize-ts/dist';
import {PagingTeamMembers} from '../../../../../models/team';
import {TeamMetricsFilter, TeamProgressMetrics, UserProgressMetrics} from '../../../../../models/metrics';
import {queries} from './team-calendar.queries';

const WEEKS_DISPLAYED = 2;
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

class Week {
  constructor(public days: string[],
              public date: string) {
  }
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
  durationFormat = DurationFormat;
  metricType = MetricType;
  today = startOfDay(new Date());

  private period$ = new BehaviorSubject<Period>(null);
  private team$ = new BehaviorSubject<Team>(null);
  private _date: Date;

  metric = MetricType.all;
  formatDate = L;
  weeks: Week[] = [];
  metrics: Metric;
  loading: boolean;

  user = new FormControl();
  dueDate = new FormControl();

  form: FormGroup = this.fb.group({
    dueDate: this.dueDate,
    user: this.user
  });

  members: TeamMember[] = [];
  current: Date = startOfDay(new Date());

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

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService,
              private fb: FormBuilder,
              public router: Router) {
    this.team$.pipe(filtering(t => !!t))
      .subscribe(() => this.loadMembers());

    this.date = new Date();
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => this.onChange(f));

    combineLatest(this.team$, this.period$)
      .pipe(filtering(([team, period]) => !!team && !!period))
      .subscribe(([team, period]) => this.loadMetrics(team, period));
  }

  private loadMetrics(team: Team, period: Period) {
    const getMetric = (group: MetricsGroup) => {
      const filter = new TeamMetricsFilter({
        team: team.id,
        start: period.start,
        end: period.end,
        group: group
      });
      return this.graphQL.get(queries.metrics, serialize(filter))
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
    this.graphQL.get(queries.members, {team: this.team.id})
      .pipe(map(({data: {team: {members}}}) =>
        deserialize(members, PagingTeamMembers)), finalize(() => this.loading = false))
      .subscribe(teams => this.members = teams.results);
  }

  private update() {
    const start = format(startOfWeek(this.date, {weekStartsOn: 1}));
    let date = start;
    this.weeks = [];
    for (let i = 0; i < WEEKS_DISPLAYED; i++) {
      this.weeks[i] = new Week([], date);
      for (let j = 0; j < DAYS_IN_WEEK; j++) {
        this.weeks[i].days[j] = format(addDays(date, j));
      }
      date = format(addWeeks(date, 1));
    }
    this.period$.next({start: new Date(start), end: new Date(date)});
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
