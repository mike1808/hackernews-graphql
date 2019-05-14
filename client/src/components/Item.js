import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from './TimeAgo';

import classes from './Item.module.css';

const Item = ({ type, title, url, by, points, createdAt, renderVoting }) => {
  return (
    <div className={classes.container}>
      <div className={classes.voting}>{renderVoting()}</div>
      <div className={classes.item}>
        <h2>
          {type === 'LINK' ? (
            <a className={classes.link} href={url}>
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <div className={classes.footer}>
          <div className={classes.action}>
            {points} {points === 1 ? 'point' : 'points'} by {by.username}{' '}
            <TimeAgo date={createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  type: PropTypes.oneOf(['LINK', 'POST']).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  by: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

export default Item;
