import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Me} from '../../models/me';

export interface IMeService {

  getUser(metrics?: boolean): Observable<Me>;

}

export let me_service = new InjectionToken('me_service');
