import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ISalariesService, salaries_service } from 'src/services/salaries/interface';
import { Salary } from 'src/models/salaries';

@Injectable()
export class SalaryResolver implements Resolve<Observable<Salary>> {

  constructor(@Inject(salaries_service) private salariesService: ISalariesService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Salary> {
    const salary = +route.params['salary'];
    return !!salary ? this.salariesService.salary(salary) : null;
  }
}
