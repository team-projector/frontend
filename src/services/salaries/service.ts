import { Injectable } from '@angular/core';
import { ISalariesService } from './interface';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingSalaries, SalariesFilter } from 'src/models/salaries';
import { encodeModel } from '../../utils/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalariesService implements ISalariesService {

  constructor(private http: HttpService) {
  }

  userSalaries(user: number, filter: SalariesFilter): Observable<PagingSalaries> {
    return this.http.get(`users/${user}/salaries`, encodeModel(filter) as HttpParams)
      .pipe(map(obj => deserialize(obj, PagingSalaries)));
  }
}
