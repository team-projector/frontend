import { Injectable } from '@angular/core';
import { ISalariesService } from './interface';
import { HttpService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingSalaries, SalariesFilter, Salary } from 'src/models/salaries';
import { encodeModel } from '../../utils/http';
import { HttpParams } from '@angular/common/http';
import { PagingTimeExpenses } from 'src/models/spent-time';

@Injectable({
  providedIn: 'root'
})
export class SalariesService implements ISalariesService {

  constructor(private http: HttpService) {
  }

  forUser(user: number, filter: SalariesFilter): Observable<PagingSalaries> {
    return this.http.get(`users/${user}/salaries`, encodeModel(filter) as HttpParams)
      .pipe(map(obj => deserialize(obj, PagingSalaries)));
  }

  salary(id: number): Observable<Salary> {
    return this.http.get(`salaries/${id}`)
      .pipe(map(obj => deserialize(obj, Salary)));
  }

  timeExpenses(salary: number): Observable<PagingTimeExpenses> {
    return this.http.get(`/salaries/${salary}/time-expenses`)
      .pipe(map(obj => deserialize(obj, PagingTimeExpenses)));
  }
}
