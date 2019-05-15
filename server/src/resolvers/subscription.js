import pubsub from '../pubsub';
import { ITEM_ADDED } from './mutation';

export const resolvers = {
  Subscription: {
    itemAdded: {
      subscribe: () => pubsub.asyncIterator([ITEM_ADDED]),
    },
  },
};
