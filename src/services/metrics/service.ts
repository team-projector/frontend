import {Injectable} from '@angular/core';
import {IMetricsService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {MetricsGroup, UserMetricsFilter, UserProgressMetrics} from 'src/models/user-progress-metrics';
import {encodeModel} from 'src/utils/http';
import {TeamProgressMetrics} from '../../models/team-progress-metrics';

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

  teamProgress(team: number, start: Date, end: Date, group: MetricsGroup): Observable<Map<string, Map<string, UserProgressMetrics>>> {
    return Observable.create((observer: any) => {
      this.http.get<TeamProgressMetrics[]>(`teams/${team}/progress-metrics`,
        encodeModel(new UserMetricsFilter({start: start, end: end, group: group})))
        .pipe(map(arr => arr.map(el => deserialize(el, TeamProgressMetrics))))
        .subscribe(metrics => {
          const dic = new Map<string, Map<string, UserProgressMetrics>>();
          metrics.forEach(m => {
            const userDic = new Map<string, UserProgressMetrics>();
            m.metrics.forEach(metric => userDic.set(metric.getKey(), metric));
            dic.set(m.user.toString(), userDic);
          });
          observer.next(dic);
          observer.complete();
        }, err => {
          observer.error(err);
          observer.complete();
        });
    }) as Observable<Map<string, Map<string, UserProgressMetrics>>>;
  }
}
