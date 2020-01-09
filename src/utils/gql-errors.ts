import { ErrorResponse } from 'apollo-link-error';
import { deserialize } from 'serialize-ts/dist';
import { GqlError, AuthorisationError, NotFoundError, NetworkError } from '../models/gql-errors';

export function convertGQLErrors({graphQLErrors, networkError}: ErrorResponse): GqlError[] {
  if (!!networkError) {
    if ('status' in networkError) {
      const msg = networkError['message'];
      switch (networkError['status']) {
        case 401:
          return [new AuthorisationError(msg)];
        case 404:
          return [new NotFoundError(msg)];
        default:
          return [new NetworkError(msg)];
      }

    }
  }
  if (!!graphQLErrors) {
    return graphQLErrors.map(err => deserialize(err, GqlError));
  }
}
