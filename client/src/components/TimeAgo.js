import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';

const TimeAgo = ({ date }) => {
  const timeAgo = useMemo(() => format(date), [date]);

  return <span>{timeAgo}</span>;
};

TimeAgo.propTypes = {
  date: PropTypes.string.isRequired,
};

export default TimeAgo;
