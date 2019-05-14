export async function getDocuments(
  query,
  { first, last, before, after },
  orderField,
  order
) {
  if (!(first || last)) {
    first = 20;
  }

  if (orderField === 'id') {
    query = (await limitQueryWithId(query, before, after, order)).query;
  } else {
    query = (await limitQuery(query, orderField, order, before, after)).query;
  }

  const pageInfo = await applyPagination(query, first, last);

  const totalCount = await getTotalCount(query);

  return {
    query,
    pageInfo,
    totalCount,
  };
}

export async function limitQueryWithId(query, before, after, order) {
  const filter = {};

  if (before) {
    const op = order === 1 ? '$lt' : '$gt';
    filter._id = { [op]: before.value };
  }

  if (after) {
    const op = order === 1 ? '$gt' : '$lt';
    filter._id = { [op]: after.value };
  }

  return { query: query.find(filter).sort({ _id: order }) };
}

export async function limitQuery(query, field, order, before, after) {
  let filter = {};
  const limits = {};
  const ors = [];

  if (before) {
    const op = order === 1 ? '$lt' : '$gt';
    const beforeObject = await query.findOne(
      {
        _id: before.value,
      },
      {
        fields: {
          [field]: 1,
        },
      }
    );
    limits[op] = beforeObject[field];
    ors.push({
      [field]: beforeObject[field],
      _id: { [op]: before.value },
    });
  }

  if (after) {
    const op = order === 1 ? '$gt' : '$lt';
    const afterObject = await query.findOne(
      {
        _id: after.value,
      },
      {
        fields: {
          [field]: 1,
        },
      }
    );
    limits[op] = afterObject[field];
    ors.push({
      [field]: afterObject[field],
      _id: { [op]: after.value },
    });
  }

  if (before || after) {
    filter = {
      $or: [
        {
          [field]: limits,
        },
        ...ors,
      ],
    };
  }

  return { query: query.find(filter).sort({ [field]: order, _id: order }) };
}

export async function applyPagination(query, first, last) {
  let count;
  if (first || last) {
    count = await query.model
      .find()
      .merge(query)
      .countDocuments()
      .exec();

    let limit;
    let skip;

    if (first && count > first) {
      limit = first;
    }

    if (last) {
      if (limit && limit > last) {
        skip = limit - last;
        limit -= skip;
      } else if (!limit && count > last) {
        skip = count - last;
      }
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.limit(limit);
    }
  }

  return {
    hasNextPage: Boolean(first && count > first),
    hasPreviousPage: Boolean(last && count > last),
  };
}

export function getTotalCount(query) {
  return query.model
    .find()
    .countDocuments()
    .exec();
}

export function getConnectionResolvers(type) {
  return {
    [`${type}Edge`]: {
      cursor(parent) {
        return { value: parent._id.toString() };
      },
      node(parent) {
        return parent;
      },
    },
    [`${type}Connection`]: {
      edges(parent) {
        return parent.query.exec();
      },
    },
  };
}
