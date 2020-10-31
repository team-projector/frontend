import { Inject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { AppConfig } from '../app-config';
import { AuthorisationError } from '../types/gql-errors';
import { convertGQLErrors } from '../utils/gql-errors';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    AppConfig
  ]
})
export class GraphQLModule {
  constructor(@Inject(AppConfig) config: AppConfig,
              apollo: Apollo,
              httpLink: HttpLink,
              router: Router) {
    const http = httpLink.create({uri: config.graphqlUrl});
    const authLink = new ApolloLink((operation, forward) => {
      if (config.token) {
        operation.setContext({
          headers: {
            'Authorization': `Bearer ${config.token.key}`
          }
        });
      }

      return forward(operation);
    });

    const errorLink = onError((resp: ErrorResponse) => {
      const errs = convertGQLErrors(resp);
      if (errs.some(e => e instanceof AuthorisationError)) {
        config.token = null;
        router.navigate(['/signup/login'])
          .then(() => null);
      }
    });

    const link = ApolloLink.from([
      errorLink,
      authLink,
      http
    ]);

    apollo.create({
      link: link,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    });
  }
}
