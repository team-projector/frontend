import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {Moment} from 'moment';
import {DayMetrics, WeekMetrics} from '../../models/metrics';
import * as moment from 'moment';
import {Me} from '../../models/me';

@Injectable({
  providedIn: 'root'
})
export class MetricsMockService implements IMetricsService {

  constructor(private http: HttpMockService) {
  }

  days(user: number, start: Moment, finish: Moment): Observable<Map<string, DayMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<DayMetrics[]>('metrics/days.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, DayMetrics);
          m.date = moment(start).add(i, 'days').startOf('day');
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, DayMetrics>();
          metrics.forEach(m => dic.set(m.date.format('L'), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, DayMetrics>>;
  }

  weeks(user: number, start: Moment, finish: Moment): Observable<Map<string, WeekMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<DayMetrics[]>('metrics/weeks.json')
        .pipe(map(arr => arr.map((el, i) => {
          const m = deserialize(el, WeekMetrics);
          m.date = moment(start).add(i, 'week');
          return m;
        })))
        .subscribe(metrics => {
          const dic = new Map<string, DayMetrics>();
          metrics.forEach(m => dic.set(m.date.format('L'), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, WeekMetrics>>;
  }
}
