import {Injectable} from '@angular/core';
import {IMilestonesService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {MilestonesFilter, PagingMilestones} from '../../models/milestone';
import {encodeModel} from '../../utils/http';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MilestonesService implements IMilestonesService {

  constructor(private http: HttpService) {
  }

  list(filter: MilestonesFilter): Observable<PagingMilestones> {
    let params = encodeModel(filter) as HttpParams;
    params = params.append('metrics', 'True');
    return this.http.get('milestones', params)
      .pipe(map(obj => deserialize(obj, PagingMilestones)));
  }

}
