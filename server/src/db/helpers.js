import mongoose from 'mongoose';
import { btoa, atob } from '../util';

function getModelAndIdFromId(id) {
  const [modelName, _id] = atob(id).split('-');

  if (!modelName || !id) throw new RangeError('Invalid ID');

  const model = mongoose.model(modelName);

  if (!model) throw new RangeError('Invalid ID');

  return [model, _id];
}

function getIdFromModelAndId(modelName, _id) {
  if (_id !== null) {
    return btoa(`${modelName}-${_id}`);
  }

  return null;
}

export { getModelAndIdFromId };
export { getIdFromModelAndId };
