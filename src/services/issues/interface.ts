import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {IssuesFilter, PagingIssues} from '../../models/issue';

export interface IIssuesService {

  list(filter: IssuesFilter): Observable<PagingIssues>;

}

export let issues_service = new InjectionToken('issues_service');
