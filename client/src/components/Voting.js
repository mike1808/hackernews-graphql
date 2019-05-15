// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@reach/tooltip';
import classNames from 'classnames';

import classes from './Voting.module.css';

type Props = {|
  onVoteUp: (SyntheticMouseEvent<HTMLButtonElement>) => mixed,
  onVoteDown: (SyntheticMouseEvent<HTMLButtonElement>) => mixed,
  disabled?: boolean,
|};

const Voting = ({ onVoteUp, onVoteDown, disabled }: Props) => {
  return (
    <div className={classes.voting}>
      <Tooltip label="Vote up">
        <button
          className={classNames(classes.up, classes.vote)}
          disabled={disabled}
          onClick={onVoteUp}
          type="button"
        >
          ▲
        </button>
      </Tooltip>
      <Tooltip label="Vote down">
        <button
          className={classNames(classes.down, classes.vote)}
          disabled={disabled}
          onClick={onVoteDown}
          type="button"
        >
          ▼
        </button>
      </Tooltip>
    </div>
  );
};

Voting.propTypes = {
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Voting;
