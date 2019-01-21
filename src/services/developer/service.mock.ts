import {Injectable} from '@angular/core';
import {IDeveloperService} from './interface';
import {Authorization, HttpMockService} from 'junte-angular';
import {Observable, of} from 'rxjs';
import {UserCredentials} from '../../models/user-credentials';
import {delay, map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';

@Injectable({
  providedIn: 'root'
})
export class DeveloperMockService implements IDeveloperService {

  constructor(private http: HttpMockService) {
  }

  login(credentials: UserCredentials): Observable<Authorization> {
    return of({type: 'mock', token: 'mock'})
      .pipe(map(obj => deserialize(obj, Authorization)), delay(500));
  }
}
