import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Salary} from 'src/models/salary';
import {graph_ql_service, IGraphQLService} from '../services/graphql/interface';
import {deserialize} from 'serialize-ts/dist';
import {map} from 'rxjs/operators';

const query = `query ($salary: ID!){
  salary (id: $salary) {
    id
    createdAt
    periodFrom
    periodTo
    chargedTime
    bonus
    taxes
    penalty
    sum
    total
    payed
  }
}`;

@Injectable()
export class SalaryResolver implements Resolve<Observable<Salary>> {

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Salary> {
    const id = +route.params['salary'];
    return this.graphQL.get(query, {salary: id})
      .pipe(map(({data: {salary}}) =>
        deserialize(salary, Salary)));
  }
}
