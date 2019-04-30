const { getIdFromModelAndId } = require('./helpers');

function globalIdPlugin(schema) {
  schema.set('id', false);

  schema.virtual('id').get(function idGetter() {
    // eslint-disable-next-line no-invalid-this
    const modelName = this.constructor.modelName;

    // eslint-disable-next-line no-invalid-this
    return getIdFromModelAndId(modelName, this._id);
  });
}

exports.globalIdPlugin = globalIdPlugin;
