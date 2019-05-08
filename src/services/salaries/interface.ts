import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PagingSalaries, SalariesFilter } from '../../models/salaries';

export interface ISalariesService {

  userSalaries(user: number, filter: SalariesFilter): Observable<PagingSalaries>;

}

export let salaries_service = new InjectionToken('salaries_service');
