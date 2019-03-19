import {Injectable} from '@angular/core';
import {IMeService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {Me} from '../../models/me';
import {encodeObject} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class MeService implements IMeService {

  constructor(private http: HttpService) {
  }

  getUser(metrics: boolean = false): Observable<Me> {
    return this.http.get('me/user', encodeObject({metrics: metrics}))
      .pipe(map(obj => deserialize(obj, Me)));
  }

}
