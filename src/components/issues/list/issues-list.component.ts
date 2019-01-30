import {Component, Inject, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormControl} from '@angular/forms';
import {IMetricsService, metrics_service} from '../../../services/metrics/interface';
import {Period} from '../../shared/calendar/models';
import {IIssuesService, issues_service} from '../../../services/issues/interface';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Metric, MetricsGroup} from '../../../models/metric';
import {ITimeExpensesService, time_expenses_service} from '../../../services/time-expenses/interface';
import {User} from '../../../models/user';
import {BehaviorSubject, combineLatest} from 'rxjs';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  user$ = new BehaviorSubject<User>(null);
  period$ = new BehaviorSubject<Period>(null);

  set user(user: User) {
    this.user$.next(user);
  }

  get user() {
    return this.user$.getValue();
  }

  set period(period: Period) {
    this.period$.next(period);
  }

  metrics = {days: new Map<string, Metric>(), weeks: new Map<string, Metric>()};
  dueDate = new FormControl(moment());
  filterForm = this.formBuilder.group({
    dueDate: this.dueDate
  });

  constructor(@Inject(issues_service) private issuesService: IIssuesService,
              @Inject(metrics_service) private metricsService: IMetricsService,
              @Inject(time_expenses_service) private timeExpensesService: ITimeExpensesService,
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

    this.metricsService.list(user.id, period.start, period.start, MetricsGroup.week)
      .subscribe(metrics => this.metrics.weeks = metrics);
  }

}
