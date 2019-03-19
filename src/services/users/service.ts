import {Injectable} from '@angular/core';
import {IUsersService} from './interface';
import {Authorization, HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {UserCredentials} from '../../models/user-credentials';
import {deserialize, serialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {ObjectLink} from '../../models/object-link';
import {User} from '../../models/user';
import {HttpParams} from '@angular/common/http';
import {encodeObject} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  constructor(private http: HttpService) {
  }

  login(credentials: UserCredentials): Observable<Authorization> {
    return this.http.post<Authorization>('login', serialize(credentials))
      .pipe(map(obj => deserialize(obj, Authorization)));
  }

  gitlab(code: string, state: string): Observable<Authorization> {
    return this.http.get<Authorization>('complete/gitlab/',
      new HttpParams({fromObject: {code: code, state: state}}))
      .pipe(map(obj => deserialize(obj, Authorization)));
  }

  get(id: number, metrics: boolean = false): Observable<User> {
    return this.http.get(`users/${id}`, encodeObject({metrics: metrics}))
      .pipe(map(obj => deserialize(obj, User)));
  }

  links(): Observable<ObjectLink[]> {
    return this.http.get<any[]>('users/links')
      .pipe(map(arr => arr.map(el => deserialize(el, ObjectLink))));
  }
}
