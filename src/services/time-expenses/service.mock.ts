import {Injectable} from '@angular/core';
import {ITimeExpensesService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {deserialize} from 'serialize-ts';
import {PagingTimeExpenses, TimeExpensesFilter} from '../../models/spent-time';
import {encodeModel} from '../../utils/http';


@Injectable({
  providedIn: 'root'
})
export class TimeExpensesMockService implements ITimeExpensesService {

  constructor(private http: HttpMockService) {
  }

  list(user: number, filter: TimeExpensesFilter): Observable<PagingTimeExpenses> {
    console.log(encodeModel(filter).toString());
    return this.http.get('time-expenses/list.json')
      .pipe(map(obj => deserialize(obj, PagingTimeExpenses)));
  }
}
