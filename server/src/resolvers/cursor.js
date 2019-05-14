import { GraphQLScalarType, Kind } from 'graphql';

import { atob, btoa } from '../util';

function toCursor({ value }) {
  return atob(value);
}

function fromCursor(string) {
  const value = btoa(string);

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
