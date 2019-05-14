// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import useDebounce from 'react-use/lib/useDebounce';
import classes from './SearchInput.module.css';

type Props = {|
  value: string,
  onChange: (value: string) => mixed,
|};

const SearchInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = React.useState(value);

  useDebounce(
    () => {
      onChange(inputValue);
    },
    500,
    [inputValue]
  );

  const handleChange = React.useCallback(
    event => {
      setInputValue(event.currentTarget.value);
    },
    [setInputValue]
  );

  return (
    <div className={classes.container}>
      <input
        className={classes.searchbar}
        type="search"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <button type="button" className={classes.btnSearch}>
        <i className="fa fa-search" />
      </button>
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
