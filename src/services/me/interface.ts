import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Me} from '../../models/me';
import {PagingIssues} from '../../models/issue';

export interface IMeService {

  getUser(): Observable<Me>;

  issues(): Observable<PagingIssues>;

}

export let me_service = new InjectionToken('me_service');
