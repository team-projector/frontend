import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Authorization} from 'junte-angular';
import {UserCredentials} from '../../models/user-credentials';

export interface IDeveloperService {

  login(credentials: UserCredentials): Observable<Authorization>;

}

export let developer_service = new InjectionToken('developer_service');
