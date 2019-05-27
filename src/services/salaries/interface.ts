import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingSalaries, SalariesFilter, Salary } from '../../models/salaries';
import { PagingTimeExpenses } from 'src/models/spent-time';

export interface ISalariesService {

  forUser(user: number, filter: SalariesFilter): Observable<PagingSalaries>;

  salary(id: number): Observable<Salary>;

  timeExpenses(salary: number): Observable<PagingTimeExpenses>;
}

export let salaries_service = new InjectionToken('salaries_service');
