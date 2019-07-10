import {Injectable} from '@angular/core';
import {IGraphQLService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';


@Injectable({providedIn: 'root'})
export class GraphQLMockService implements IGraphQLService {

  constructor(private http: HttpMockService) {
  }

  get<T>(query: { operation: string, variables: Object, fields: Object[] }): Observable<T> {
    throw new Error('Was not implemented');
  }

}
