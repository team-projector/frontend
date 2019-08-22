import { Inject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { SchemaLink } from 'apollo-link-schema';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { mocks } from 'src/components/mocks';
import { schema } from 'src/components/schema';
import { AppConfig } from '../app-config';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule,
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

    const errorLink = onError(({graphQLErrors, networkError}: ErrorResponse) => {
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        config.token = null;
        router.navigate(['/signup/login']);
      }
      if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
    });

    let link: ApolloLink;

    if (config.useMocks) {
      addMockFunctionsToSchema({schema, mocks, preserveResolvers: true});
      link = new SchemaLink({schema});
    } else {
      link = ApolloLink.from([
        errorLink,
        authLink,
        http
      ]);
    }

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
