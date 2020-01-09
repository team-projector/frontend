import { ErrorResponse } from 'apollo-link-error';
import { Observable } from 'rxjs';
import { convertGQLErrors } from '../utils/gql-errors';

export function catchGQLErrors() {
  return function (source: Observable<any>) {
    return new Observable(observer => {
      return source.subscribe({
        next(x) {
          observer.next(x);
        },
        error(err: ErrorResponse) {
          observer.error(convertGQLErrors(err));
        },
        complete() {
          observer.complete();
        }
      });
    });
  };
}
