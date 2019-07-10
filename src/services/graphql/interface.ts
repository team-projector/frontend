import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export interface IGraphQLService {

  get<T>(query: { operation: string, variables: Object, fields: Object[] }): Observable<T>;

}

export let graph_ql_service = new InjectionToken('graph_ql_service');
