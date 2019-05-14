import { getVotes } from './vote';
import { Item, Vote, User } from '../db/models';
import { getDocuments, getConnectionResolvers } from './helpers';

export async function feed(parent, { before, after, first, last, query }) {
  const q = query
    ? {
        $text: { $search: query || '' },
      }
    : null;
  return getDocuments(Item.find(q), { first, last, before, after }, 'id', -1);
}

function votes(parent, args) {
  return getVotes(Vote.find({ post: parent.id }), args, 'id', -1);
}

function createdAt(parent) {
  return parent.createdAt.toISOString();
}

function by(parent) {
  return User.findById(parent.by);
}

function rating(parent) {
  return Vote.aggregate([
    {
      $match: { item: parent._id },
    },
    {
      $group: {
        _id: '$item',
        total: { $sum: '$type' },
      },
    },
  ]).then(([doc]) => {
    if (doc) return doc.total;
    return 0;
  });
}

function canVote(parent, args, context) {
  return Vote.findOne(
    {
      item: parent._id,
      by: context.user,
    },
    'id'
  ).then(doc => !doc);
}

export const resolvers = {
  Item: {
    votes,
    createdAt,
    by,
    rating,
    canVote,
  },
  ...getConnectionResolvers('Item'),
};
