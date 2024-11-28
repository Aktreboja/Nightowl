'use client';
import '@/globals.css';
import AppContainer from '@/components/UI/AppContainer';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';

// Home base page. Remained as a Server component to modify Metadata content
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
