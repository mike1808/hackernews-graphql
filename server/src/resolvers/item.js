const Comment = require('mongoose').model('Comment');
const Vote = require('mongoose').model('Vote');
const User = require('mongoose').model('User');
const Item = require('mongoose').model('Item');

const { getComments } = require('./comment');
const { getVotes } = require('./vote');

const { getDocuments, getConnectionResolvers } = require('./helpers');

async function allItems(parent, { before, after, first, last }) {
  return getDocuments(Item.find(), { first, last, before, after }, 'id', -1);
}

function comments(parent, args) {
  return getComments(Comment.find({ post: parent.id }), args, 'id', -1);
}

function votes(parent, args) {
  return getVotes(Vote.find({ post: parent.id }), args, 'id', -1);
}

function createdAt(parent) {
  return parent.createdAt.toISOString();
}

function by(parent) {
  return User.findById(parent.by);
}

exports.allItems = allItems;

exports.resolvers = {
  Item: {
    comments,
    votes,
    createdAt,
    by,
  },
  ...getConnectionResolvers('Item'),
};
