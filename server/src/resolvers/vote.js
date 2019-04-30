const Item = require('mongoose').model('Item');
const { getDocuments, getConnectionResolvers } = require('./helpers');

function item(parent) {
  return Item.findById(parent.id);
}

exports.getVotes = getDocuments;

exports.resolvers = {
  Vote: {
    item,
  },
  ...getConnectionResolvers('Vote'),
};
