import { Injectable } from '@angular/core';
import { IIssuesService } from './interface';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { deserialize } from 'serialize-ts';
import { map } from 'rxjs/operators';
import { IssueCard, IssuesFilter, PagingIssues } from '../../models/issue';
import { encodeModel } from '../../utils/http';
import { IssueProblemsFilter, PagingIssueProblems } from '../../models/problem';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssuesService implements IIssuesService {

  constructor(private http: HttpService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    // TODO: refactor API
    return this.http.get(filter.team ? `teams/${filter.team}/issues` : 'issues', encodeModel(filter))
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }

  problemsForUser(user: number, filter: IssueProblemsFilter): Observable<PagingIssueProblems> {
    // TODO: refactor when API will be changed
    let params = encodeModel(filter) as HttpParams;
    params = params.append('user', user.toString());
    return this.http.get('issues/problems', params)
      .pipe(map(obj => deserialize(obj, PagingIssueProblems)));
  }

  sync(id: number): Observable<IssueCard> {
    return this.http.post(`issues/${id}/sync`)
      .pipe(map(obj => deserialize(obj, IssueCard)));
  }

}
