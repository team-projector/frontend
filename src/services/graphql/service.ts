import {Injectable} from '@angular/core';
import {IGraphQLService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize} from 'serialize-ts';
import {query as graphql} from 'gql-query-builder';
import {serialize} from 'serialize-ts/dist';

@Injectable()
export class GraphQLService implements IGraphQLService {

  constructor(private http: HttpService) {
  }

  get<T>({operation, variables, fields}: { operation: string, variables: Object, fields: Object[] }): Observable<T> {
    const query = graphql({
      operation: operation,
      variables: serialize(variables),
      fields: fields
    });
    return this.http.post('graphql', query);
  }

}
