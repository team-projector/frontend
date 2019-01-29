import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {DayMetrics, WeekMetrics} from '../../models/metrics';

export interface IMetricsService {

  days(user: number, start: Moment, finish: Moment): Observable<Map<string, DayMetrics>>;

  weeks(user: number, start: Moment, finish: Moment): Observable<Map<string, WeekMetrics>>;

}

export let metrics_service = new InjectionToken('metrics_service');
