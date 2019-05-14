import { toGlobalId } from 'graphql-relay';

function globalIdPlugin(schema) {
  schema.set('id', false);

  schema.virtual('id').get(function idGetter() {
    // eslint-disable-next-line no-invalid-this
    const modelName = this.constructor.modelName;

    // eslint-disable-next-line no-invalid-this
    return toGlobalId(modelName, this._id);
  });
}

export { globalIdPlugin };
