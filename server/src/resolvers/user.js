const User = require('mongoose').model('User');

const { getDocuments, getConnectionResolvers } = require('./helpers');

async function allUsers(parent, { before, after, first, last }) {
  return getDocuments(User.find(), { first, last, before, after }, 'id', -1);
}

exports.allUsers = allUsers;

exports.resolvers = {
  ...getConnectionResolvers('User'),
};
