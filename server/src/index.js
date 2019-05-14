// @flow

import { ApolloServer, gql } from 'apollo-server';
import initDb from './db';
import { User } from './db/models';

initDb();

import path from 'path';
import fs from 'fs';
import config from './config';

import resolvers from './resolvers';

async function main() {
  // TODO: add authentication
  const user = (await User.findOne())._id;

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
      user,
    }),
  });

  return server
    .listen()
    .then(({ port }) =>
      console.log(`Server is running on http://localhost:${port}`)
    );
}

main().catch(console.error.bind(console));
