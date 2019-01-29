import {Injectable} from '@angular/core';
import {IIssuesService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {IssuesFilter, PagingIssues} from '../../models/issue';
import {encodeParams} from '../../utils/http';


@Injectable({
  providedIn: 'root'
})
export class IssuesMockService implements IIssuesService {

  constructor(private http: HttpMockService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    console.log(encodeParams(filter).toString());
    return this.http.get('issues/list.json')
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }
}
