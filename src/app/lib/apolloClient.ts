import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useAppSelector } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

// Authentication setup for Spotify Routes
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = useAppSelector(checkToken);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
