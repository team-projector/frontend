import { Component, Inject, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMetricsService, metrics_service } from 'src/services/metrics/interface';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MetricsGroup, UserMetrics } from 'src/models/user-metrics';
import { User } from 'src/models/user';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Period } from 'junte-ui/lib/components/calendar/models';

const L = 'DD/MM/YYYY';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

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

  metrics = {days: new Map<string, UserMetrics>(), weeks: new Map<string, UserMetrics>()};
  dueDate = new FormControl(new Date());
  filterForm = this.formBuilder.group({
    dueDate: this.dueDate
  });

  constructor(@Inject(metrics_service) private metricsService: IMetricsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.pipe(filter(({user}) => !!user))
      .subscribe(({user}) => this.user = user);

    combineLatest(this.user$, this.period$)
      .pipe(filter(([u, p]) => !!u && !!p))
      .subscribe(([u, p]) => this.loadMetrics(u, p));
  }

  loadMetrics(user: User, period: Period) {
    this.metricsService.list(user.id, period.start, period.end, MetricsGroup.day)
      .subscribe(metrics => this.metrics.days = metrics);

    this.metricsService.list(user.id, period.start, period.end, MetricsGroup.week)
      .subscribe(metrics => this.metrics.weeks = metrics);
  }

}
