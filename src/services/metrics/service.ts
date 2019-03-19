import { Injectable } from '@angular/core';
import { IMetricsService } from './interface';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { deserialize } from 'serialize-ts';
import { map } from 'rxjs/operators';
import { MetricsGroup, UserProgressMetrics, UserMetricsFilter } from 'src/models/user-progress-metrics';
import { encodeModel } from 'src/utils/http';

@Injectable({
  providedIn: 'root'
})
export class MetricsService implements IMetricsService {

  constructor(private http: HttpService) {
  }

  userProgress(user: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, UserProgressMetrics>> {
    return Observable.create((observer: any) => {
      this.http.get<UserProgressMetrics[]>(`users/${user}/progress-metrics`,
        encodeModel(new UserMetricsFilter({start: start, end: end, group: group})))
        .pipe(map(arr => arr.map(el => deserialize(el, UserProgressMetrics))))
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
