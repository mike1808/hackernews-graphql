import React from 'react';
import PropTypes from 'prop-types';

import classes from './Item.module.css';

const Item = ({ type, title, url, by, createdAt, commentsCount }) => {
  return (
    <div className={classes.container}>
      <h2>{type === 'link'
        ? <a className={classes.link} href={url}>{title}</a>
        : title
      }
      </h2>
      <div className={classes.footer}>
        <div className={classes.action}>
          123 points by {by.username} on {createdAt}
        </div>
        <div className={classes.action}>
          {commentsCount} comments
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  type: PropTypes.oneOf(['link', 'post']).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.isRequired,
  commentsCount: PropTypes.number.isRequired,
  by: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Item;
