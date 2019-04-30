const mongoose = require('mongoose');
const { globalIdPlugin } = require('./plugins');

mongoose.plugin(globalIdPlugin);

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['LINK', 'POST'],
    },
    url: {
      type: String,
      required() {
        return this.type === 'LINK';
      },
    },
    text: {
      type: String,
      required() {
        return this.type === 'POST';
      },
    },
    title: {
      type: String,
      required: true,
    },
    by: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    comments: {
      type: [
        {
          type: 'ObjectId',
          ref: 'Comment',
        },
      ],
      default: [],
    },
    votes: {
      type: [
        {
          type: 'ObjectId',
          ref: 'Vote',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { id: false }
);

itemSchema.virtual('gqlType').get(() => 'Item');

itemSchema.index({ createdAt: -1 });

mongoose.model('Item', itemSchema);

const commentSchema = new mongoose.Schema(
  {
    item: {
      type: 'ObjectId',
      ref: 'Item',
      required: true,
    },
    by: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { id: false }
);
commentSchema.virtual('gqlType').get(() => 'Comment');

mongoose.model('Comment', commentSchema);

const voteSchema = new mongoose.Schema(
  {
    item: {
      type: 'ObjectId',
      ref: 'Item',
      required: true,
    },
    by: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    type: {
      type: Number,
      enum: [-1, 1],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { id: false }
);

voteSchema.virtual('gqlType').get(() => 'Vote');
voteSchema.index({ createdAt: -1 });

mongoose.model('Vote', voteSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { id: false }
);

userSchema.virtual('gqlType').get(() => 'User');
userSchema.index({ createdAt: -1 });

mongoose.model('User', userSchema);
