import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Me} from '../../models/me';
import {IssueCard} from '../../models/issue';
import {Paging} from '../../models/paging';

export interface IMeService {

  getUser(): Observable<Me>;

  issues(): Observable<Paging<IssueCard>>;

}

export let me_service = new InjectionToken('me_service');
