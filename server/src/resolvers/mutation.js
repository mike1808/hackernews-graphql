const Item = require('mongoose').model('Item');
const Comment = require('mongoose').model('Comment');

function postLink(parent, args) {
  return Item.create({
    type: 'LINK',
    title: args.title,
    url: args.url,
    comments: [],
    votes: [],
  });
}

function postPost(parent, args) {
  return Item.create({
    type: 'POST',
    title: args.title,
    text: args.text,
  });
}

function addComment(parent, args) {
  return Comment.create({
    item: args.item,
    text: args.text,
    by: args.by,
  });
}

exports.resolvers = {
  postLink,
  postPost,
  addComment,
};
