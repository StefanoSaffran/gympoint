import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function Height({ name, setChange }) {
  const ref = useRef();
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.value',
      });
    }
  }, [ref, fieldName]); // eslint-disable-line

  return (
    <>
      <NumberFormat
        placeholder="1.80"
        decimalSeparator="."
        decimalScale={2}
        isNumericString
        allowNegative={false}
        ref={ref}
        name={fieldName}
        value={value}
        onValueChange={values => {
          setValue(values.floatValue);
          if (setChange) {
            setChange(values.floatValue);
          }
        }}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Height.defaultProps = {
  setChange: null,
};

Height.propTypes = {
  name: PropTypes.string.isRequired,
  setChange: PropTypes.func,
};
