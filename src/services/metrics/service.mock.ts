import { Injectable } from '@angular/core';
import { IMetricsService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { MetricsGroup, UserProgressMetrics } from 'src/models/user-progress-metrics';
import { addDays, addWeeks, endOfDay, endOfISOWeek, startOfDay } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class MetricsMockService implements IMetricsService {

  constructor(private http: HttpMockService) {
  }

  userProgress(user: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, UserProgressMetrics>> {
    switch (group) {
      case MetricsGroup.day:
        return this.days(start);
      case MetricsGroup.week:
        return this.weeks(start);
    }
  }

  teamProgress(team: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<number, Map<string, UserProgressMetrics>>> {
    const users = [1, 2, 3, 4, 5];
    switch (group) {
      case MetricsGroup.day: {
        return Observable.create((observer: any) => {
          this.days(start).subscribe(days => {
            const dic = new Map<number, Map<string, UserProgressMetrics>>();
            users.forEach(user => dic.set(user, days));
            observer.next(dic);
            observer.complete();
          }, err => {
            observer.error(err);
            observer.complete();
          });
        }) as Observable<Map<number, Map<string, UserProgressMetrics>>>;
      }
      case MetricsGroup.week:
        return Observable.create((observer: any) => {
          this.weeks(start).subscribe(days => {
            const dic = new Map<number, Map<string, UserProgressMetrics>>();
            users.forEach(user => dic.set(user, days));
            observer.next(dic);
            observer.complete();
          }, err => {
            observer.error(err);
            observer.complete();
          });
        }) as Observable<Map<number, Map<string, UserProgressMetrics>>>;
    }
  }

  days(start: Date): Observable<Map<string, UserProgressMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserProgressMetrics[]>('metrics/user-progress.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserProgressMetrics);
          const period = startOfDay(addDays(start, i));
          m.start = period;
          m.end = endOfDay(period);
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, UserProgressMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, UserProgressMetrics>>;
  }

  weeks(start: Date): Observable<Map<string, UserProgressMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserProgressMetrics[]>('metrics/user-progress.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserProgressMetrics);
          const period = startOfDay(addWeeks(start, i));
          m.start = period;
          m.end = endOfISOWeek(period);
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, UserProgressMetrics>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, UserProgressMetrics>>;
  }
}
