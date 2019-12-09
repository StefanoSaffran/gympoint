import React from 'react';
import PropTypes from 'prop-types';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
  FaAngleLeft,
} from 'react-icons/fa';

import { Container } from './styles';

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <Container>
      <button type="button" disabled={page === 1} onClick={() => setPage(1)}>
        <FaAngleDoubleLeft size={20} />
      </button>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <FaAngleLeft size={20} />
      </button>
      <p>{page}</p>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        <FaAngleRight size={20} />
      </button>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
      >
        <FaAngleDoubleRight size={20} />
      </button>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
