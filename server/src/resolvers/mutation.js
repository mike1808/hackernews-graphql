import { getModelAndIdFromId } from '../db/helpers';
import { Item, Vote } from '../db/models';

function postLink(parent, { input }) {
  return Item.create({
    type: 'LINK',
    title: input.title,
    url: input.url,
    votes: [],
  });
}

function postPost(parent, { input }, context) {
  return Item.create({
    type: 'POST',
    title: input.title,
    text: input.text,
    by: context.user,
  });
}

function vote(parent, { input }, context) {
  const type = input.type === 'UP' ? 1 : -1;
  const [, itemId] = getModelAndIdFromId(input.item);

  return Vote.create({
    item: itemId,
    type,
    by: context.user,
  })
    .then(() => Item.findById(itemId))
    .then(item => ({ item }));
}

export const resolvers = {
  Mutation: {
    postLink,
    postPost,
    vote,
  },
};
