import { ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  // TODO: Update with PulseChain indexer URL
  uri: 'https://headsup-pulsechain-indexer.up.railway.app/', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

