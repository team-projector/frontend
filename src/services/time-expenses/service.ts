import {Injectable} from '@angular/core';
import {ITimeExpensesService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {map} from 'rxjs/operators';
import {PagingTimeExpenses, TimeExpensesFilter} from '../../models/spent-time';
import {encodeModel} from '../../utils/http';

@Injectable({
  providedIn: 'root'
})
export class TimeExpensesService implements ITimeExpensesService {

  constructor(private http: HttpService) {
  }

  list(user: number, filter: TimeExpensesFilter): Observable<PagingTimeExpenses> {
    return this.http.get(`/users/${user}/time-expenses`, encodeModel(filter))
      .pipe(map(obj => deserialize(obj, PagingTimeExpenses)));
  }

}
