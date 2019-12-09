import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

import { Container } from './styles';

const Modal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState('');

  const showHidestyle = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Container style={showHidestyle}>
      <section className="modal-main">
        <MdClear size={16} color="red" onClick={toggleVisibility} />
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
};

export default Modal;
