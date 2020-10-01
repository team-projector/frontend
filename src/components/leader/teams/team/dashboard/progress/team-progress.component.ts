import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { addDays, addWeeks, endOfWeek, getDate, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { of, zip } from 'rxjs';
import { delay, filter as filtering, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts/dist';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { UserProblem } from 'src/models/enums/user';
import { PagingTeamMembers, Team, TeamMember, TeamMemberProgressMetrics, TeamMetricsFilter } from 'src/models/team';
import { UserProgressMetrics } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { METRIC_TYPE } from '../../../../../shared/metrics-type/consts';
import { TeamMembersGQL, TeamMetricsGQL } from './team-progress.graphql';

const DAYS_IN_WEEK = 7;
const DAYS_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const L = 'dd/MM/yyyy';

interface TeamMetrics {
  days: Map<string, Map<string, UserProgressMetrics>>;
  weeks: Map<string, Map<string, UserProgressMetrics>>;
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

  private _team: Team;
  private _current: Date = this.today;

  progress = {developers: false, metrics: false};

  days: Date[] = [];
  developers: TeamMember[] = [];
  metrics: TeamMetrics;

  metricControl = this.fb.control(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.fb.group({
    metric: this.metricControl
  });

  @Input()
  set team(team: Team) {
    this._team = team;
    this.loadMembers();
    this.loadMetrics();
  }

  get team() {
    return this._team;
  }

  set current(current: Date) {
    this._current = current;
    this.render();
  }

  get current() {
    return this._current;
  }

  @Output()
  selected = new EventEmitter<{ developer: string, dueDate: Date }>();

  constructor(private teamMembersGQL: TeamMembersGQL,
              private teamMetrics: TeamMetricsGQL,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.current = new Date();
  }

  private loadMembers() {
    this.progress.developers = true;
    (environment.mocks
      ? of(getMock(PagingTeamMembers)).pipe(delay(MOCKS_DELAY))
      : this.teamMembersGQL.fetch({team: this.team.id} as R)
        .pipe(map(({data: {team: {members}}}) => deserialize(members, PagingTeamMembers))))
      .pipe(delay(UI_DELAY), finalize(() => this.progress.developers = false))
      .subscribe(members => this.developers = members.results);
  }

  loadMetrics() {
    const getMetric = (group: Metrics) => {
      const filter = new TeamMetricsFilter({
        team: this.team.id,
        start: startOfWeek(this.current, {weekStartsOn: 1}),
        end: endOfWeek(this.current, {weekStartsOn: 1}),
        group: group
      });
      return (environment.mocks
        ? of(Array.apply(null, Array(10))
          .map((v, i) => getMock(TeamMemberProgressMetrics, filter, i))).pipe(delay(MOCKS_DELAY))
        : this.teamMetrics.fetch(serialize(filter) as R)
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

    this.progress.metrics = true;
    zip(getMetric(Metrics.day), getMetric(Metrics.week))
      .pipe(finalize(() => this.progress.metrics = false))
      .subscribe(([days, weeks]) => this.metrics = {days, weeks});
  }

  private render() {
    const start = startOfWeek(this.current, {weekStartsOn: 1});
    this.days = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      this.days[i] = addDays(start, i);
    }
  }

}
