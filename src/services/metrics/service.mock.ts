import { Injectable } from '@angular/core';
import { IMetricsService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { MetricsGroup, UserMetrics } from 'src/models/user-metrics';
import { addDays, addWeeks, endOfDay, endOfISOWeek, startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class MetricsMockService implements IMetricsService {

  constructor(private http: HttpMockService) {
  }

  list(user: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, UserMetrics>> {
    switch (group) {
      case MetricsGroup.day:
        return this.days(start);
      case MetricsGroup.week:
        return this.weeks(start);
    }
  }

  days(start: Date): Observable<Map<string, UserMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserMetrics[]>('metrics/days.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserMetrics);
          const period = startOfDay(addDays(start, i));
          m.start = period;
          m.end = endOfDay(period);
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, UserMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, UserMetrics>>;
  }

  weeks(start: Date): Observable<Map<string, UserMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserMetrics[]>('metrics/weeks.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserMetrics);
          const period = startOfDay(addWeeks(start, i));
          m.start = period;
          m.end = endOfISOWeek(period);
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, UserMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, UserMetrics>>;
  }
}
