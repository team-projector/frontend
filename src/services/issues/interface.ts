import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Issue, IssuesFilter, IssuesSummary, PagingIssues} from '../../models/issue';

export interface IIssuesService {

  list(filter: IssuesFilter): Observable<PagingIssues>;

  summary(filter: IssuesFilter): Observable<IssuesSummary>;

  sync(id: number): Observable<Issue>;
}

export let issues_service = new InjectionToken('issues_service');
