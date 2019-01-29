import {Injectable} from '@angular/core';
import {IMeService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {Me} from '../../models/me';

@Injectable({
  providedIn: 'root'
})
export class MeService implements IMeService {

  constructor(private http: HttpService) {
  }

  getUser(): Observable<Me> {
    return this.http.get('me/user')
      .pipe(map(obj => deserialize(obj, Me)));
  }

}
