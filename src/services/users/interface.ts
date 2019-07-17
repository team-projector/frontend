import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Authorization} from 'junte-angular';

export interface IUsersService {

  gitlab(code: string, state: string): Observable<Authorization>;

}

export let users_service = new InjectionToken('users_service');
