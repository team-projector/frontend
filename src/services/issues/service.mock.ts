import { Injectable } from '@angular/core';
import { IIssuesService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Issue, IssuesFilter, IssuesSummary, PagingIssues } from '../../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssuesMockService implements IIssuesService {

  constructor(private http: HttpMockService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    return this.http.get('issues/list.json')
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }

  summary(filter: IssuesFilter): Observable<IssuesSummary> {
    return this.http.get('issues/summary.json')
      .pipe(map(obj => deserialize(obj, IssuesSummary)));
  }

  sync(id: number): Observable<Issue> {
    return this.http.get('issues/get.json')
      .pipe(map(obj => deserialize(obj, Issue)));
  }
}
