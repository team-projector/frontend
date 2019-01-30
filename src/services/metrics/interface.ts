import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {Metric, MetricsGroup} from '../../models/metric';

export interface IMetricsService {

  list(user: number, start: Moment, end: Moment, group: MetricsGroup): Observable<Map<string, Metric>>;

}

export let metrics_service = new InjectionToken('metrics_service');
