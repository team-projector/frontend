import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Period, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { NGXLogger } from 'ngx-logger';
import { of, zip } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { Me, UserMetricsFilter, UserProgressMetrics } from 'src/models/user';
import { getMock } from 'src/utils/mocks';
import { METRIC_TYPE } from 'src/components/metrics-type/consts';
import { DeveloperIssuesMetricsGQL } from './developer-progress.graphql';

interface Metric {
  days: Map<string, UserProgressMetrics>;
  weeks: Map<string, UserProgressMetrics>;
}

@Component({
  selector: 'app-developer-progress',
  templateUrl: './developer-progress.component.html',
  styleUrls: ['./developer-progress.component.scss']
})
export class DeveloperProgressComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  metricType = MetricType;
  formatDate = 'dd/MM/yyyy';

  progress = {loading: false};

  period: Period;
  metrics = {
    days: new Map<string, UserProgressMetrics>(),
    weeks: new Map<string, UserProgressMetrics>()
  };

  metricControl = this.fb.control(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.fb.group({
    metric: this.metricControl
  });

  @Input()
  me: Me;

  @Output()
  selected = new EventEmitter<Date>();

  constructor(private metricsGQL: DeveloperIssuesMetricsGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.metricControl.valueChanges
      .subscribe(metric => localStorage.setItem(METRIC_TYPE, metric));
  }

  loadMetrics(period: Period) {
    this.period = period;
    this.logger.debug('load metrics', period);
    const getMetric = (group: Metrics) => {
      const filter = new UserMetricsFilter({
        user: this.me.id,
        start: this.period.start,
        end: this.period.end,
        group: group
      });

      this.progress.loading = true;
      const action = environment.mocks
        ? of(Array.apply(null, Array(20))
          .map(() => getMock(UserProgressMetrics, filter)))
          .pipe(delay(MOCKS_DELAY))
        : this.metricsGQL.fetch(serialize(filter) as R)
          .pipe(map(({data: {userProgressMetrics}}) =>
            userProgressMetrics.map(el => deserialize(el, UserProgressMetrics))));

      return action.pipe(delay(UI_DELAY), finalize(() => this.progress.loading = false),
        map(metrics => {
          const dic = new Map<string, UserProgressMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          return dic;
        }));
    };

    zip(getMetric(Metrics.day), getMetric(Metrics.week))
      .subscribe(([days, weeks]) =>
        this.metrics = {days, weeks});
  }

}
