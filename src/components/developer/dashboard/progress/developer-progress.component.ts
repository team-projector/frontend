import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Period, UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { NGXLogger } from 'ngx-logger';
import { of, zip } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { METRIC_TYPE } from 'src/components/shared/metrics-type/consts';
import { DATE_FORMAT, MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { Metrics, MetricType } from 'src/models/enums/metrics';
import { Me, UserMetricsFilter, UserProgressMetrics } from 'src/models/user';
import { getMock } from '@junte/mocker';
import { DeveloperIssuesMetricsGQL } from './developer-progress.graphql';

interface DeveloperMetrics {
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
  localUi = LocalUI;
  durationFormat = DurationFormat;
  metricType = MetricType;
  dateFormat = DATE_FORMAT;

  progress = {loading: false};

  period: Period;
  metrics: DeveloperMetrics;

  metricControl = this.fb.control(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form = this.fb.group({
    metric: this.metricControl
  });

  @Input()
  me: Me;

  constructor(private metricsGQL: DeveloperIssuesMetricsGQL,
              private fb: FormBuilder,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.metricControl.valueChanges
      .subscribe(metric => localStorage.setItem(METRIC_TYPE, metric));
  }

  loadMetrics() {
    this.logger.debug('load metrics', this.period);
    const getMetric = (group: Metrics) => {
      const filter = new UserMetricsFilter({
        user: this.me.id,
        start: this.period.start,
        end: this.period.end,
        group: group
      });

      this.progress.loading = true;
      const action = environment.mocks
        ? of(Array.apply(null, Array(120))
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
      .subscribe(([days, weeks]) => {
        this.metrics = {days, weeks}; console.log(this.metrics)});
  }

}
