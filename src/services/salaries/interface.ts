import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {PagingSalaries, SalariesFilter, Salary} from '../../models/salaries';

export interface ISalariesService {

  list(filter: SalariesFilter): Observable<PagingSalaries>;

  salary(id: number): Observable<Salary>;
}

export let salaries_service = new InjectionToken('salaries_service');
