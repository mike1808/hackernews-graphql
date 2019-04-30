const mongoose = require('mongoose');
const { btoa, atob } = require('../util');

function getModelAndIdFromId(id) {
  const [modelName, _id] = btoa(id).split('-');

  if (!modelName || !id) throw new RangeError('Invalid ID');

  const model = mongoose.model(modelName);

  if (!model) throw new RangeError('Invalid ID');

  return [model, _id];
}

function getIdFromModelAndId(modelName, _id) {
  if (_id !== null) {
    return atob(`${modelName}-${_id}`);
  }

  return null;
}

exports.getModelAndIdFromId = getModelAndIdFromId;
exports.getIdFromModelAndId = getIdFromModelAndId;
