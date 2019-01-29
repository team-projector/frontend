import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {PagingTimeExpenses, TimeExpensesFilter} from '../../models/spent-time';

export interface ITimeExpensesService {

  list(filter: TimeExpensesFilter): Observable<PagingTimeExpenses>;

}

export let time_expenses_service = new InjectionToken('time_expenses_service');
