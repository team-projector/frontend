import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {Moment} from 'moment';
import {UserMetrics, UserMetricsFilter, MetricsGroup} from '../../models/user-metrics';
import {encodeParams} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class MetricsService implements IMetricsService {

  constructor(private http: HttpService) {
  }

  list(user: number, start: Moment, end: Moment, group: MetricsGroup): Observable<Map<string, UserMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserMetrics[]>(`users/${user}/metrics`,
        encodeParams(new UserMetricsFilter({ start: start, end: end, group: group})))
        .pipe(map(arr => arr.map(el => deserialize(el, UserMetrics))))
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
