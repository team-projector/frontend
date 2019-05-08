import { Injectable } from '@angular/core';
import { ISalariesService } from './interface';
import { HttpMockService } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { PagingSalaries, SalariesFilter } from 'src/models/salaries';

@Injectable({
  providedIn: 'root'
})
export class SalariesMockService implements ISalariesService {

  constructor(private http: HttpMockService) {
  }

  userSalaries(user: number, filter: SalariesFilter): Observable<PagingSalaries> {
    return this.http.get('salaries/list.json')
      .pipe(map(obj => deserialize(obj, PagingSalaries)));
  }
}
