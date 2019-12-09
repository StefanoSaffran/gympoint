import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import {Container, TInput} from './styles';

const Input = ({style, ...rest}, ref) => {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
};

export default forwardRef(Input);
