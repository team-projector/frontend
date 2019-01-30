import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {Authorization} from 'junte-angular';
import {UserCredentials} from '../../models/user-credentials';
import {ObjectLink} from '../../models/object-link';
import {User} from '../../models/user';

export interface IUsersService {

  login(credentials: UserCredentials): Observable<Authorization>;

  get(id: number): Observable<User>;

  links(): Observable<ObjectLink[]>;

}

export let users_service = new InjectionToken('users_service');
