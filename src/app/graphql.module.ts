import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

// const uri = 'https://intense-sierra-39113.herokuapp.com/graphql';
const uri = 'https://develop-algernon.herokuapp.com/graphql';
export function createApollo(httpLink: HttpLink) {
  const link = ApolloLink.from([
    setContext((_, context) => ({
      headers: { Authorization: context.token }
    })),
    httpLink.create({
      uri,
      method: 'POST'
    })
  ]);
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
