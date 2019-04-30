const Query = require('./query').resolvers;
const { Item, ItemConnection, ItemEdge } = require('./item').resolvers;
const Node = require('./node').resolvers;
const Cursor = require('./cursor');
const {
  Comment,
  CommentConnection,
  CommentEdge,
} = require('./comment').resolvers;
const { UserConnection, UserEdge } = require('./user').resolvers;

const { Vote, VoteConnection, VoteEdge } = require('./vote').resolvers;
const Mutation = require('./mutation').resolvers;

module.exports = {
  Query,
  Mutation,

  Item,
  ItemConnection,
  ItemEdge,
  Node,
  Cursor,
  Comment,
  CommentConnection,
  CommentEdge,
  Vote,
  VoteConnection,
  VoteEdge,
  UserConnection,
  UserEdge,
};
