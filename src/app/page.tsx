'use client';
import './globals.css';
import AppContainer from '@/app/_Containers/AppContainer';
import { ApolloProvider } from '@apollo/client';
import client from './_lib/apolloClient';

// Home base page. Remained as a Server component to modify Metadata content
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
