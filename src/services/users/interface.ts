import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Authorization} from 'junte-angular';
import {UserCredentials} from '../../models/user-credentials';

export interface IUsersService {

  login(credentials: UserCredentials): Observable<Authorization>;

  gitlab(code: string, state: string): Observable<Authorization>;

}

export let users_service = new InjectionToken('users_service');
