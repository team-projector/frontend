import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsGroup, UserMetrics } from 'src/models/user-metrics';

export interface IMetricsService {

  list(user: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, UserMetrics>>;

}

export let metrics_service = new InjectionToken('metrics_service');
