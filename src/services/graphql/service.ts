import {Injectable} from '@angular/core';
import {IGraphQLService} from './interface';
import {HttpService} from 'junte-angular';
import {Observable} from 'rxjs';
import {deserialize, serialize} from 'serialize-ts';

@Injectable()
export class GraphQLService implements IGraphQLService {

  constructor(private http: HttpService) {
  }

  get<T>(query: string, variables: Object = {}): Observable<T> {
    return this.http.post('graphql', {
      query: query,
      variables: variables
    });
  }

}
