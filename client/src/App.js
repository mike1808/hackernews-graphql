import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Layout from './components/Layout';
import client from './api';
import Feed from './containers/Feed';

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Feed />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
