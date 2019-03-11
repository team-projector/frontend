import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {UserMetrics, MetricsGroup} from '../../models/user-metrics';

export interface IMetricsService {

  list(user: number, start: Moment, end: Moment, group: MetricsGroup): Observable<Map<string, UserMetrics>>;

}

export let metrics_service = new InjectionToken('metrics_service');
