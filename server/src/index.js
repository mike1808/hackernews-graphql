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
      fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8') // eslint-disable-line no-sync
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

  return server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });
}

main().catch(console.error.bind(console));
