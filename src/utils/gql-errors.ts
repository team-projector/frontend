import { ErrorResponse } from 'apollo-link-error';
import { deserialize } from 'serialize-ts/dist';
import { GqlError, AuthorisationError } from '../models/gql-errors';

export function convertGQLErrors({graphQLErrors, networkError}: ErrorResponse): GqlError[] {
  if (!!networkError) {
    if ('status' in networkError) {
      switch (networkError['status']) {
        case 401:
          return [new AuthorisationError(networkError['message'])];
      }

    }
  }
  if (!!graphQLErrors) {
    return graphQLErrors.map(err => deserialize(err, GqlError));
  }
}
