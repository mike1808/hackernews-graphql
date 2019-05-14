import { User } from '../db/models';
import { getDocuments, getConnectionResolvers } from './helpers';

async function allUsers(parent, { before, after, first, last }) {
  return getDocuments(User.find(), { first, last, before, after }, 'id', -1);
}

export { allUsers };

export const resolvers = {
  ...getConnectionResolvers('User'),
};
