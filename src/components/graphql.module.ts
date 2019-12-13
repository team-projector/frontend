import { Inject, NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { AppConfig } from '../app-config';

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
              httpLink: HttpLink) {
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

    const errorLink = onError(({graphQLErrors, networkError}: ErrorResponse) => {
      if (networkError) {
        console.log('Network error: ', networkError);
        // config.token = null;
        // router.navigate(['/signup/login']);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach(({message, path}) => {
          console.error(`GraphQL error [${path.join(' => ')}]: ${message}`);
        });
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
          errorPolicy: 'none'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'none'
        },
        mutate: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'none'
        }
      }
    });
  }
}
