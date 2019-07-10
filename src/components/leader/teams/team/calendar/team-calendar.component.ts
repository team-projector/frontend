import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Team, TeamMemberCard, TeamMemberRole} from 'src/models/team';
import {UI} from 'junte-ui';
import {addDays, addWeeks, endOfDay, format, isEqual, isFuture, isPast, startOfDay, startOfWeek, subWeeks} from 'date-fns';
import {distinctUntilChanged, filter, finalize} from 'rxjs/operators';
import {BehaviorSubject, zip} from 'rxjs';
import {MetricsGroup, UserProgressMetrics} from 'src/models/user-progress-metrics';
import {DurationFormat} from 'src/pipes/date';
import {Period} from 'junte-ui/lib/components/calendar/models';
import {IMetricsService, metrics_service} from 'src/services/metrics/interface';
import {Router} from '@angular/router';
import {isUndefined} from 'util';
import {UserCard, UserProblem} from 'src/models/user';
import {ITeamsService, teams_service} from 'src/services/teams/interface';
import {equals} from '../../../../utils/equals';

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
  user: UserCard;
  dueDate: Date;
}

class Week {
  constructor(public days: string[],
              public date: string) {
  }
}

class Metric {
  constructor(public days: Map<number, Map<string, UserProgressMetrics>>,
              public weeks: Map<number, Map<string, UserProgressMetrics>>) {
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
  private _team: Team;
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

  members: TeamMemberCard[] = [];
  current: Date = startOfDay(new Date());

  @Input()
  set team(team: Team) {
    if (!equals(this._team, team)) {
      this._team = team;
      if (!!team) {
        this.loadMembers();
      }
    }
  }

  get team() {
    return this._team;
  }

  set date(date: Date) {
    this._date = date;
    this.update();
  }

  get date() {
    return this._date;
  }

  constructor(@Inject(metrics_service) private metricsService: IMetricsService,
              @Inject(teams_service) private teamsService: ITeamsService,
              private fb: FormBuilder,
              public router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => this.onChange(f));

    this.period$.pipe(filter(period => !!period))
      .subscribe(period => {
        zip(this.metricsService.teamProgress(this.team.id, period.start, period.end, MetricsGroup.day),
          this.metricsService.teamProgress(this.team.id, period.start, period.end, MetricsGroup.week))
          .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
      });

    this.date = new Date();
  }

  private loadMembers() {
    this.loading = true;
    this.teamsService.members(this.team.id, [TeamMemberRole.developer])
      .pipe(finalize(() => this.loading = false))
      .subscribe(members => this.members = members.results);
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
      this.form.patchValue({user: value.user, dueDate: value.dueDate}, {emitEvent: false});
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
