import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salary } from 'src/models/salary';
import { deserialize } from '@junte/serialize-ts';
import { map } from 'rxjs/operators';
import { getMock } from '@junte/mocker';
import { SalaryGQL } from './salary.graphql';

@Injectable({providedIn: 'root'})
export class SalaryResolver implements Resolve<Observable<Salary>> {

  constructor(private salaryGQL: SalaryGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Salary> {
    const id = route.params['salary'];
    return environment.mocks
      ? of(getMock(Salary, {id: id}))
      : this.salaryGQL.fetch({salary: id})
      .pipe(map(({data: {salary}}) =>
        deserialize(salary, Salary)));
  }
}
