import { Component, Inject, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMetricsService, metrics_service } from 'src/services/metrics/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { MetricsGroup, UserProgressMetrics } from 'src/models/user-progress-metrics';
import { User } from 'src/models/user';
import { BehaviorSubject, combineLatest, zip } from 'rxjs';
import { Period } from 'junte-ui/lib/components/calendar/models';
import { UI } from 'junte-ui';
import { DurationFormat } from '../../../pipes/date';
import { IIssuesService, issues_service } from '../../../services/issues/interface';
import { IssuesFilter, IssuesSummary } from 'src/models/issue';

class Metric {
  constructor(public days: Map<string, UserProgressMetrics>,
              public weeks: Map<string, UserProgressMetrics>) {
  }
}

@Component({
  selector: 'app-issues-list',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  format = format;
  formatDate = 'DD/MM/YYYY';

  summary: IssuesSummary;

  set user(user: User) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  set period(period: Period) {
    this.period$.next(period);
  }

  metrics = new Metric(
    new Map<string, UserProgressMetrics>(),
    new Map<string, UserProgressMetrics>()
  );
  dueDate = new FormControl();
  filterForm = this.formBuilder.group({dueDate: this.dueDate});

  constructor(@Inject(issues_service) private issuesService: IIssuesService,
              @Inject(metrics_service) private metricsService: IMetricsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, dueDate}) => {
      this.user = user;
      this.filterForm.patchValue({dueDate: dueDate},
        {emitEvent: false});

      this.issuesService.summary(new IssuesFilter({
        user: user.id,
        dueDate: dueDate
      })).subscribe(summary => this.summary = summary);
    });

    this.dueDate.valueChanges.pipe(distinctUntilChanged())
      .subscribe(dueDate => {
          const state: { due_date? } = {};
          if (!!dueDate) {
            state.due_date = format(dueDate, 'MM-DD-YYYY');
          }
          this.router.navigate([state, 'issues'], {relativeTo: this.route});
        }
      );

    combineLatest(this.user$, this.period$)
      .pipe(filter(([user, period]) => !!user && !!period))
      .subscribe(([user, period]) => this.loadUserProgressMetrics(user, period));
  }

  private loadUserProgressMetrics(user: User, period: Period) {
    const getMetric = (group: MetricsGroup) => this.metricsService.userProgress(user.id, period.start, period.end, group);

    zip(getMetric(MetricsGroup.day), getMetric(MetricsGroup.week))
      .subscribe(([days, weeks]) => this.metrics = new Metric(days, weeks));
  }

}
