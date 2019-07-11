import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Issue, IssuesFilter, IssuesSummary} from '../../models/issue';

export interface IIssuesService {

  summary(filter: IssuesFilter): Observable<IssuesSummary>;

  sync(id: number): Observable<Issue>;
}

export let issues_service = new InjectionToken('issues_service');
