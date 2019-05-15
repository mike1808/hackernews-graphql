// @flow

import { ApolloServer, gql } from 'apollo-server';
import initDb from './db';
import { User } from './db/models';

initDb();

import path from 'path';
import fs from 'fs';
import config from './config';

import resolvers from './resolvers';

// TODO: remove this and add authentication
async function getOrCreateUser() {
  let user = await User.findOne();

  if (!user) {
    user = await User.create({ username: 'admin' });
  }

  return user._id;
}

async function main() {
  const user = await getOrCreateUser();

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
