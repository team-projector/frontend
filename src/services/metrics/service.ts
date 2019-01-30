import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {Moment} from 'moment';
import {Metric, MetricFilter, MetricsGroup} from '../../models/metric';
import {encodeParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class MetricsService implements IMetricsService {

  constructor(private http: HttpService) {
  }

  list(user: number, start: Moment, end: Moment, group: MetricsGroup): Observable<Map<string, Metric>> {
    return Observable.create((observer: any) => {
      this.http.get<Metric[]>('metrics/days',
        encodeParams(new MetricFilter({user: user, start: start, end: end, group: group})))
        .pipe(map(arr => arr.map(el => deserialize(el, Metric))))
        .subscribe(metrics => {
          const dic = new Map<string, Metric>();
          metrics.forEach(m => dic.set(m.getKey(), m));
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, Metric>>;
  }
}
