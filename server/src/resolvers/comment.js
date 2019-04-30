const Item = require('mongoose').model('Item');
const { getDocuments, getConnectionResolvers } = require('./helpers');

function item(parent) {
  return Item.findById(parent.id);
}

exports.getComments = getDocuments;

exports.resolvers = {
  Comment: {
    item,
  },
  ...getConnectionResolvers('Comment'),
};
