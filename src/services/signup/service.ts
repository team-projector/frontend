import {Injectable} from '@angular/core';
import {ISignupService} from './interface';
import {Authorization, HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {UserCredentials} from '../../models/user-credentials';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService implements ISignupService {

  constructor(private http: HttpService) {
  }

  login(credentials: UserCredentials): Observable<Authorization> {
    return this.http.post<Authorization>('login', credentials)
      .pipe(map(obj => deserialize(obj, Authorization)));
  }
}
