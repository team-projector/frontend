import {Injectable} from '@angular/core';
import {IIssuesService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {IssuesFilter, PagingIssues} from '../../models/issue';
import {encodeParams} from '../../utils/http';
import {IssueProblemsFilter, PagingIssueProblems} from '../../models/problem';

@Injectable({
  providedIn: 'root'
})
export class IssuesService implements IIssuesService {

  constructor(private http: HttpService) {
  }

  list(filter: IssuesFilter): Observable<PagingIssues> {
    return this.http.get('issues', encodeParams(filter))
      .pipe(map(obj => deserialize(obj, PagingIssues)));
  }

  problems(filter: IssueProblemsFilter): Observable<PagingIssueProblems> {
    return this.http.get('issues/problems', encodeParams(filter))
      .pipe(map(obj => deserialize(obj, PagingIssueProblems)));
  }

}
