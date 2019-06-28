import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueCard, IssuesFilter, PagingIssues } from '../../models/issue';
import { IssueProblemsFilter, PagingIssueProblems } from '../../models/problem';

export interface IIssuesService {

  list(filter: IssuesFilter): Observable<PagingIssues>;

  problemsForUser(user: number, filter: IssueProblemsFilter): Observable<PagingIssueProblems>;

  sync(id: number): Observable<IssueCard>;
}

export let issues_service = new InjectionToken('issues_service');
