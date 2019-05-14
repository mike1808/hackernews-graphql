import mongoose from 'mongoose';
import { fromGlobalId } from 'graphql-relay';

export function getModelAndIdFromId(id) {
  const { type: modelName, id: _id } = fromGlobalId(id);

  if (!modelName || !id) throw new RangeError('Invalid ID');

  const model = mongoose.model(modelName);

  if (!model) throw new RangeError('Invalid ID');

  return [model, _id];
}
