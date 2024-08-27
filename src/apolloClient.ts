import { ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://headsup-indexer.up.railway.app/', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

