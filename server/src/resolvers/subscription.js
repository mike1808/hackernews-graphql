import pubsub from '../pubsub';
import { ITEM_ADDED, VOTED } from './mutation';

export const resolvers = {
  Subscription: {
    itemAdded: {
      subscribe: () => pubsub.asyncIterator([ITEM_ADDED]),
    },
    voted: {
      subscribe: () => pubsub.asyncIterator([VOTED]),
    },
  },
};
