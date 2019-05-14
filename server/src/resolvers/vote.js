import { Item } from '../db/models';
import { getDocuments, getConnectionResolvers } from './helpers';

function item(parent) {
  return Item.findById(parent.id);
}

export { getDocuments as getVotes };

export const resolvers = {
  Vote: {
    item,
  },
  ...getConnectionResolvers('Vote'),
};
