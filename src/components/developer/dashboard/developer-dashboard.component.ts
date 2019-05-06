import {Component, Inject, OnInit} from '@angular/core';
import {format, parse} from 'date-fns';
import {FormBuilder, FormControl} from '@angular/forms';
import {IMetricsService, metrics_service} from 'src/services/metrics/interface';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {MetricsGroup, UserProgressMetrics} from 'src/models/user-progress-metrics';
import {User} from 'src/models/user';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {Period} from 'junte-ui/lib/components/calendar/models';
import {UI} from 'junte-ui';

const L = 'DD/MM/YYYY';

@Component({
  selector: 'app-issues-list',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent implements OnInit {
  ui = UI;

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  format = format;
  formatDate = L;

  set user(user: User) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  set period(period: Period) {
    this.period$.next(period);
  }

  metrics = {days: new Map<string, UserProgressMetrics>(), weeks: new Map<string, UserProgressMetrics>()};
  dueDate = new FormControl(new Date());
  filterForm = this.formBuilder.group({
    dueDate: this.dueDate
  });

  constructor(@Inject(metrics_service) private metricsService: IMetricsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, dueDate}) => {
      this.user = user;
      this.filterForm.patchValue({dueDate: dueDate}, {emitEvent: false});
    });

    this.dueDate.valueChanges.pipe(distinctUntilChanged())
      .subscribe(date => this.router.navigate([
          {due_date: format(date, 'MM-DD-YYYY')}, 'issues'],
        {relativeTo: this.route}));

    combineLatest(this.user$, this.period$)
      .pipe(filter(([u, p]) => !!u && !!p))
      .subscribe(([u, p]) => this.loadUserProgressMetrics(u, p));
  }

  private loadUserProgressMetrics(user: User, period: Period) {
    this.metricsService.userProgress(user.id, period.start, period.end, MetricsGroup.day)
      .subscribe(metrics => this.metrics.days = metrics);

    this.metricsService.userProgress(user.id, period.start, period.end, MetricsGroup.week)
      .subscribe(metrics => this.metrics.weeks = metrics);
  }

}