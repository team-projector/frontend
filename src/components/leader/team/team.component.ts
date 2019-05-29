import { Component, Inject, OnInit } from '@angular/core';
import { ITeamsService, teams_service } from '../../../services/teams/interface';
import { TeamMemberCard } from '../../../models/team';
import { UI } from 'junte-ui';
import { ActivatedRoute } from '@angular/router';
import { addDays, addWeeks, format, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, zip } from 'rxjs';
import { MetricsGroup, UserProgressMetrics } from '../../../models/user-progress-metrics';
import { IMetricsService, metrics_service } from '../../../services/metrics/interface';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { DurationFormat } from '../../../pipes/date';

const WEEKS_DISPLAYED = 2;
const DAYS_IN_WEEK = 7;
const L = 'DD/MM/YYYY';

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
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

  private period$ = new BehaviorSubject<Period>(null);
  private _date: Date;

  members: TeamMemberCard[] = [];
  subWeeks = subWeeks;
  addWeeks = addWeeks;
  format = format;
  formatDate = L;
  weeks: Week[] = [];
  metrics: Metric;
  metricLabels = ['Est', 'Sp', 'Ef'];
  weekDayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  current: Date = startOfDay(new Date());
  team: number;

  set date(date: Date) {
    this._date = date;
    this.update();
  }

  get date() {
    return this._date;
  }

  constructor(@Inject(teams_service) private teamsService: ITeamsService,
              @Inject(metrics_service) private metricsService: IMetricsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.pipe(filter(({members}) => !!members))
      .subscribe(({members}) => this.members = members.results);

    this.route.params.subscribe(({team}) => this.team = team);

    this.period$.pipe(filter(period => !!period))
      .subscribe(period => {
        zip(this.metricsService.teamProgress(this.team, period.start, period.end, MetricsGroup.day),
          this.metricsService.teamProgress(this.team, period.start, period.end, MetricsGroup.week))
          .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
      });

    this.date = new Date();
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
}
