import {Injectable} from '@angular/core';
import {IUsersService} from './interface';
import {Authorization, HttpMockService} from 'junte-angular';
import {Observable, of} from 'rxjs';
import {UserCredentials} from '../../models/user-credentials';
import {delay, map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {ObjectLink} from '../../models/object-link';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements IUsersService {

  constructor(private http: HttpMockService) {
  }

  login(credentials: UserCredentials): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }

  gitlab(code: string, state: string): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }

  get(id: number, metrics: boolean = false): Observable<User> {
    return this.http.get('users/get.json')
      .pipe(map(src => {
        const obj = deserialize(src, User);
        obj.id = Math.round(Math.random() * 100);
        return obj;
      }));
  }

  links(): Observable<ObjectLink[]> {
    return this.http.get<ObjectLink[]>('users/links.json')
      .pipe(map(arr => arr.map(el => deserialize(el, ObjectLink))));
  }
}
