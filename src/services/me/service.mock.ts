import {Injectable} from '@angular/core';
import {IMeService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {Me} from '../../models/me';


@Injectable({
  providedIn: 'root'
})
export class MeMockService implements IMeService {

  constructor(private http: HttpMockService) {
  }

  getUser(): Observable<Me> {
    return this.http.get('me/get-user.json')
      .pipe(map(obj => deserialize(obj, Me)));
  }

}
