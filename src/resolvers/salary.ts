import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Salary } from 'src/models/salary';
import { deserialize } from 'serialize-ts/dist';
import { map } from 'rxjs/operators';
import { SalaryGQL } from './salary.graphql';

@Injectable()
export class SalaryResolver implements Resolve<Observable<Salary>> {

  constructor(private salaryApollo: SalaryGQL) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Salary> {
    const id = +route.params['salary'];
    return null;
    return this.salaryApollo.fetch({salary: id})
      .pipe(map(({data: {salary}}) =>
        deserialize(salary, Salary)));
  }
}
