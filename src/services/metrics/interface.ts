import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsGroup, UserProgressMetrics } from 'src/models/user-progress-metrics';

export interface IMetricsService {

  userProgress(user: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, UserProgressMetrics>>;

  teamProgress(team: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<number, Map<string, UserProgressMetrics>>>;

}

export let metrics_service = new InjectionToken('metrics_service');
