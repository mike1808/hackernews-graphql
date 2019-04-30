const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURL, { useNewUrlParser: true });
mongoose.set('debug', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('./models');

if (config.populateDB) {
  require('./populate')();
}

const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'schema.graphql'),
  resolvers,
  options: {
    port: config.port,
  },
});

server.start(({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
