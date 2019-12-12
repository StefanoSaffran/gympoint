import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import useComponentVisible from '~/helpers/hooks/useComponentVisible';

import { Container } from './styles';

const Modal = React.forwardRef((props, forwardRef) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const [answer, setAnswer] = useState('');

  const showHidestyle = { display: isComponentVisible ? '' : 'none' };

  useImperativeHandle(forwardRef, () => {
    return {
      setIsComponentVisible,
    };
  });

  return (
    <Container visible={isComponentVisible} style={showHidestyle}>
      <section className="modal-main" ref={ref}>
        {props.children}
        <div>
          <strong className="answer">SUA RESPOSTA</strong>
          <textarea
            placeholder="exemplo@email.com"
            rows="4"
            name="answer"
            onChange={({ target }) => setAnswer(target.value)}
          />
        </div>
        <button type="button" onClick={() => props.handleAnswer(answer)}>
          Responder aluno
        </button>
      </section>
    </Container>
  );
});

Modal.propTypes = {
  handleAnswer: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
