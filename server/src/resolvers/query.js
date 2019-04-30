const { allItems } = require('./item');
const { allUsers } = require('./user');
const { getModelAndIdFromId } = require('../models/helpers');

function node(parent, { id }) {
  const [Model, _id] = getModelAndIdFromId(id);
  return Model.findById(_id);
}

exports.resolvers = {
  node,
  allItems,
  allUsers,
};
