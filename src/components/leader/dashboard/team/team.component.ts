import { Component, Inject, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays, addWeeks, format, startOfDay, startOfWeek, subWeeks } from 'date-fns';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { BehaviorSubject, zip } from 'rxjs';
import { MetricsGroup, UserProgressMetrics } from '../../../../models/user-progress-metrics';
import { IMetricsService, metrics_service } from '../../../../services/metrics/interface';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { ITeamsService, teams_service } from '../../../../services/teams/interface';
import { Team, TeamMemberCard } from '../../../../models/team';
import { DurationFormat } from 'src/pipes/date';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

class Params {
  constructor(defs: any = null) {
    for (const def in defs) {
      if (!!defs[def]) {
        this[def] = defs[def];
      }
    }
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
  private team$ = new BehaviorSubject<Team>(null);

  private _date: Date;

  dueDate = new FormControl(new Date());
  user = new FormControl(null);
  filterForm: FormGroup = this.fb.group({
    dueDate: this.dueDate,
    user: this.user
  });

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

  set date(date: Date) {
    this._date = date;
    this.update();
  }

  get date() {
    return this._date;
  }

  set team(team: Team) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  constructor(@Inject(teams_service) private teamsService: ITeamsService,
              @Inject(metrics_service) private metricsService: IMetricsService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filterForm.valueChanges.pipe(distinctUntilChanged())
      .subscribe(f => {
        const params = new Params({
          user: !!f.user ? f.user.id : null,
          due_date: !!f.dueDate ? format(f.dueDate, 'MM-DD-YYYY') : null
        });
        this.router.navigate([params, 'issues'],
          {relativeTo: this.route});
      });

    this.route.data.subscribe(({members, team, dueDate, user}) => {
      if (!!members) {
        this.members = members.results;
      }
      if (!!team) {
        this.team = team;
      }
      this.filterForm.patchValue({user: user, dueDate: dueDate}, {emitEvent: false});
    });

    this.period$.pipe(filter(period => !!period))
      .subscribe(period => {
        zip(this.metricsService.teamProgress(this.team.id, period.start, period.end, MetricsGroup.day),
          this.metricsService.teamProgress(this.team.id, period.start, period.end, MetricsGroup.week))
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
