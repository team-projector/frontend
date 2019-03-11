import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UserMetrics, MetricsGroup} from '../../models/user-metrics';

@Injectable({
  providedIn: 'root'
})
export class MetricsMockService implements IMetricsService {

  constructor(private http: HttpMockService) {
  }

  list(user: number, start: Moment, end: Moment, group: MetricsGroup): Observable<Map<string, UserMetrics>> {
    switch (group) {
      case MetricsGroup.day:
        return this.days(start);
      case MetricsGroup.week:
        return this.weeks(start);
    }
  }

  days(start: Moment): Observable<Map<string, UserMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserMetrics[]>('metrics/days.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserMetrics);
          const period = moment(start).add(i, 'days').startOf('day');
          m.start = moment(period);
          m.end = moment(period).endOf('day');
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

  weeks(start: Moment): Observable<Map<string, UserMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserMetrics[]>('metrics/weeks.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, UserMetrics);
          const period = moment(start).add(i, 'week').startOf('day');
          m.start = moment(period);
          m.end = moment(period).endOf('week');
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
