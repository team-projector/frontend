import {Injectable} from '@angular/core';
import {IUsersService} from './interface';
import {Authorization, HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {UserCredentials} from '../../models/user-credentials';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {ObjectLink} from '../../models/object-link';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  constructor(private http: HttpService) {
  }

  login(credentials: UserCredentials): Observable<Authorization> {
    return this.http.post<Authorization>('login', credentials)
      .pipe(map(obj => deserialize(obj, Authorization)));
  }

  get(id: number): Observable<User> {
    return this.http.get(`users/${id}`)
      .pipe(map(obj => deserialize(obj, User)));
  }

  links(): Observable<ObjectLink[]> {
    return this.http.get<any[]>('users/links')
      .pipe(map(arr => arr.map(el => deserialize(el, ObjectLink))));
  }
}
