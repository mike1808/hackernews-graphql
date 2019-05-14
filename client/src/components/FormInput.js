// @flow

import * as React from 'react';
import classNames from 'classnames';
import classes from './FormInput.module.css';

type Props = {
  field: {
    name: string,
    value: any,
    onChange: (SyntheticInputEvent<HTMLInputElement>) => mixed,
    onBlur: (SyntheticInputEvent<HTMLInputElement>) => mixed,
    onFocus: (SyntheticInputEvent<HTMLInputElement>) => mixed,
  },
  form: {
    touched: { [string]: boolean },
    errors: { [string]: boolean },
  },
  className?: string,
};

const FormInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: Props) => {
  const invalid = touched[field.name] && errors[field.name];

  return (
    <div>
      <input
        type="text"
        {...field}
        {...props}
        className={classNames(props.className, { [classes.invalid]: invalid })}
      />
      {invalid && <div className="error">{errors[field.name]}</div>}
    </div>
  );
};

export default FormInput;
