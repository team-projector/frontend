import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {encodeParams} from '../../utils/http';
import {Moment} from 'moment';
import {DayMetrics, WeekMetrics} from '../../models/metrics';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService implements IMetricsService {

  constructor(private http: HttpService) {
  }

  days(user: number, start: Moment, finish: Moment): Observable<Map<string, DayMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<DayMetrics[]>('metrics/days')
        .pipe(map(arr => arr.map(el => deserialize(el, DayMetrics))))
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
      this.http.get<DayMetrics[]>('metrics/weeks')
        .pipe(map(arr => arr.map(el => deserialize(el, WeekMetrics))))
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
