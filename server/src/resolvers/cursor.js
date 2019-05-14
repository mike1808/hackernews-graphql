import { GraphQLScalarType, Kind } from 'graphql';

import { unbase64, base64 } from '../util';

function toCursor({ value }) {
  return base64(value);
}

function fromCursor(string) {
  const value = unbase64(string);

  if (value) {
    return { value };
  }
  return null;
}

const CursorType = new GraphQLScalarType({
  name: 'Cursor',
  serialize(value) {
    if (value) {
      return toCursor(value);
    }
    return null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return fromCursor(ast.value);
    }
    return null;
  },
  parseValue(value) {
    return fromCursor(value);
  },
});

export default CursorType;
