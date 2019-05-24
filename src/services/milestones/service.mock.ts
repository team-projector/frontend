import {Injectable} from '@angular/core';
import {IMilestonesService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {MilestonesFilter, PagingMilestones} from '../../models/milestone';


@Injectable({
  providedIn: 'root'
})
export class MilestonesMockService implements IMilestonesService {

  constructor(private http: HttpMockService) {
  }

  list(filter: MilestonesFilter): Observable<PagingMilestones> {
    return this.http.get('milestones/list.json')
      .pipe(map(obj => deserialize(obj, PagingMilestones)));
  }

}
