export const resolvers = {
  Node: {
    __resolveType(obj) {
      if (typeof obj.gqlType === 'string') return obj.gqlType;
      return null;
    },
  },
};
