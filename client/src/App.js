import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import client from './api';
import Feed from './containers/Feed';
import CreateItem from './containers/CreateItem';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Layout>
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/create" component={CreateItem} />
          </Switch>
        </Layout>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
