// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';

type Values = {|
  title: string,
  url: string,
  text: string,
|};

type Props = {|
  onSubmit: (values: Values) => Promise<mixed>,
|};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  url: Yup.string()
    .url()
    .required('Link is required'),
});

const CreateItemForm = ({ onSubmit }: Props) => {
  const handleFormikSubmit = React.useCallback(
    (values, { setSubmitting }) => {
      onSubmit(values)
        .then(() => {
          setSubmitting(false);
        })
        .then(() => {
          setSubmitting(false);
        });
    },
    [onSubmit]
  );

  return (
    <Formik
      initialValues={{
        title: '',
        url: '',
      }}
      onSubmit={handleFormikSubmit}
      validationSchema={validationSchema}
    >
      {props => {
        const { dirty, isSubmitting, handleReset } = props;

        return (
          <Form name="createLink">
            <label style={{ display: 'block' }}>
              Title
              <Field
                placeholder="Enter link title"
                type="text"
                name="title"
                component={FormInput}
              />
            </label>

            <label style={{ display: 'block' }}>
              URL
              <Field
                placeholder="Enter link"
                type="text"
                name="url"
                component={FormInput}
              />
            </label>

            <div>
              <button
                type="button"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

CreateItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateItemForm;
