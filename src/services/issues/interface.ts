import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {IssuesFilter, PagingIssues} from '../../models/issue';
import {IssueProblemsFilter, PagingIssueProblems} from '../../models/problem';

export interface IIssuesService {

  list(filter: IssuesFilter): Observable<PagingIssues>;

  problems(filter: IssueProblemsFilter): Observable<PagingIssueProblems>;

}

export let issues_service = new InjectionToken('issues_service');
