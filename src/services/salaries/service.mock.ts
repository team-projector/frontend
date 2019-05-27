import { Injectable } from '@angular/core';
import { ISalariesService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingSalaries, SalariesFilter, Salary } from 'src/models/salaries';
import { PagingTimeExpenses } from 'src/models/spent-time';

@Injectable({
  providedIn: 'root'
})
export class SalariesMockService implements ISalariesService {

  constructor(private http: HttpMockService) {
  }

  forUser(user: number, filter: SalariesFilter): Observable<PagingSalaries> {
    return this.http.get('salaries/list.json')
      .pipe(map(obj => deserialize(obj, PagingSalaries)));
  }

  salary(id: number): Observable<Salary> {
    return this.http.get('salaries/salary.json')
      .pipe(map(obj => deserialize(obj, Salary)));
  }

  timeExpenses(salary: number): Observable<PagingTimeExpenses> {
      return this.http.get('salaries/time-expenses.json')
        .pipe(map(obj => deserialize(obj, PagingTimeExpenses)));
  }
}
