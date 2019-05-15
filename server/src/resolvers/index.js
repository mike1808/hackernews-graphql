import Cursor from './cursor';

import { resolvers as QueryResolves } from './query';
import { resolvers as ItemResolvers } from './item';
import { resolvers as NodeResolves } from './node';
import { resolvers as UserResolvers } from './user';
import { resolvers as VoteResolvers } from './vote';
import { resolvers as MutationResolvers } from './mutation';
import { resolvers as SubscriptionResolvers } from './subscription';

export default {
  Cursor,

  ...SubscriptionResolvers,
  ...QueryResolves,
  ...ItemResolvers,
  ...NodeResolves,
  ...UserResolvers,
  ...VoteResolvers,
  ...MutationResolvers,
};
