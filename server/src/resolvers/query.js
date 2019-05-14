import { feed } from './item';

import { allUsers } from './user';

import { getModelAndIdFromId } from '../db/helpers';

function node(parent, { id }) {
  const [Model, _id] = getModelAndIdFromId(id);
  return Model.findById(_id);
}

export const resolvers = {
  Query: {
    node,
    feed,
    allUsers,
  },
};
