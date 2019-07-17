import {Injectable} from '@angular/core';
import {IUsersService} from './interface';
import {Authorization, HttpMockService} from 'junte-angular';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService implements IUsersService {

  constructor(private http: HttpMockService) {
  }

  gitlab(code: string, state: string): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(src => deserialize(src, Authorization)), delay(500));
  }
}
