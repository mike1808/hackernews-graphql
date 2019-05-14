// @flow

import { ApolloServer, gql } from 'apollo-server';
import initDb from './db';

initDb();

import path from 'path';
import fs from 'fs';
import config from './config';

import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs: gql(
    fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
  ),
  resolvers,
  options: {
    port: config.port,
  },
  context: context => ({
    ...context,
    user: '5cc79927aebc084a88fa08a1',
  }),
});

server
  .listen()
  .then(({ port }) =>
    console.log(`Server is running on http://localhost:${port}`)
  );
