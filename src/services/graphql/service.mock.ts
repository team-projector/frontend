import {Injectable} from '@angular/core';
import {IGraphQLService} from './interface';
import {HttpMockService} from 'junte-angular';
import {Observable} from 'rxjs';

@Injectable()
export class GraphQLMockService implements IGraphQLService {

  constructor(private http: HttpMockService) {
  }

  get<T>(query: string, variables: Object): Observable<T> {
    throw new Error('Was not implemented');
  }

}
