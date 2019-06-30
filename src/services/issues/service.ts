import {Injectable} from '@angular/core';
import {IIssuesService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {Issue, IssuesFilter, IssuesSummary, PagingIssues} from '../../models/issue';
import {encodeModel} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class IssuesService implements IIssuesService {

  constructor(private http: HttpService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    return this.http.get('issues', encodeModel(filter))
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }

  summary(filter: IssuesFilter): Observable<IssuesSummary> {
    return this.http.get('issues/summary', encodeModel(filter))
      .pipe(map(obj => deserialize(obj, IssuesSummary)));
  }

  sync(id: number): Observable<Issue> {
    return this.http.post(`issues/${id}/sync`)
      .pipe(map(obj => deserialize(obj, Issue)));
  }

}
