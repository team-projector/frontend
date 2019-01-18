import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Authorization} from 'junte-angular';
import {UserCredentials} from '../../models/user-credentials';

export interface ISignupService {

  login(credentials: UserCredentials): Observable<Authorization>;

}

export let signup_service = new InjectionToken('signup_service');
