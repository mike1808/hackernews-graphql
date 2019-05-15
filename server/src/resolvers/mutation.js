import { getModelAndIdFromId } from '../db/helpers';
import { Item, Vote } from '../db/models';
import pubsub from '../pubsub';

export const ITEM_ADDED = 'ITEM_ADDED';
export const VOTED = 'VOTED';

async function postLink(parent, { input }, context) {
  return Item.create({
    type: 'LINK',
    title: input.title,
    url: input.url,
    votes: [],
    by: context.user,
  }).then(item => {
    pubsub.publish(ITEM_ADDED, { itemAdded: item });
    return { item };
  });
}

async function postPost(parent, { input }, context) {
  return Item.create({
    type: 'POST',
    title: input.title,
    text: input.text,
    by: context.user,
  }).then(item => ({ item }));
}

async function vote(parent, { input }, context) {
  const type = input.type === 'UP' ? 1 : -1;
  const [, itemId] = getModelAndIdFromId(input.item);

  return Vote.create({
    item: itemId,
    type,
    by: context.user,
  })
    .then(() => Item.findById(itemId))
    .then(item => {
      pubsub.publish(VOTED, { voted: { item } });

      return { item };
    });
}

export const resolvers = {
  Mutation: {
    postLink,
    postPost,
    vote,
  },
};
