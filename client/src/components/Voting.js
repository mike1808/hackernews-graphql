import React from 'react';
import PropTypes from 'prop-types';
import classes from './Voting.module.css';

const Voting = ({ onVoteUp, onVoteDown, disabled }) => {
  return (
    <div className={classes.voting}>
      <button
        disabled={disabled}
        onClick={onVoteUp}
        type="button"
        className={classes.up}
      >
        Up
      </button>
      <button
        disabled={disabled}
        onClick={onVoteDown}
        type="button"
        className={classes.down}
      >
        Down
      </button>
    </div>
  );
};

Voting.propTypes = {
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Voting;
