import Cursor from './cursor';

import { resolvers as QueryResolves } from './query';
import { resolvers as ItemResolvers } from './item';
import { resolvers as NodeResolves } from './node';
import { resolvers as UserResolvers } from './user';
import { resolvers as VoteResolvers } from './vote';
import { resolvers as MutationResolvers } from './mutation';

export default {
  Cursor,

  ...QueryResolves,
  ...ItemResolvers,
  ...NodeResolves,
  ...UserResolvers,
  ...VoteResolvers,
  ...MutationResolvers,
};
