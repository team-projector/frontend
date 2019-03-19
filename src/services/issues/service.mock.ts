import {Injectable} from '@angular/core';
import {IIssuesService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {IssuesFilter, PagingIssues} from '../../models/issue';
import {IssueProblemsFilter, PagingIssueProblems} from '../../models/problem';


@Injectable({
  providedIn: 'root'
})
export class IssuesMockService implements IIssuesService {

  constructor(private http: HttpMockService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    return this.http.get('issues/userProgress.json')
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }

  problems(filter: IssueProblemsFilter): Observable<PagingIssueProblems> {
    return this.http.get('issues/problems.json')
      .pipe(map(obj => deserialize(obj, PagingIssueProblems)));
  }
}
