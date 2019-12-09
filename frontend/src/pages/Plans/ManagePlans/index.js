import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { MdKeyboardArrowLeft, MdSave } from 'react-icons/md';

import { unFormat } from '~/helpers/format';
import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';
import { Container, Header } from './styles';
import {
  storePlanRequest,
  updatePlanRequest,
} from '~/store/modules/plans/actions';

export default function StorePlans() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const getPlan = async () => {
        const res = await api.get(`/plans/${id}`);

        setTitle(res.data.title);
        setDuration(res.data.duration);
        setPrice(res.data.price);
        setLoading(false);
      };

      getPlan();
    }
  }, [id]);

  const total = useMemo(() => (unFormat(price) * duration * 100) / 100, [
    duration,
    price,
  ]);

  const handleSubmit = e => {
    setLoading(true);
    e.preventDefault();
    if (id) {
      dispatch(updatePlanRequest(id, title, duration, unFormat(price)));
    } else {
      dispatch(storePlanRequest(title, duration, unFormat(price)));
    }
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <>
          <Header>
            <h1>{id ? 'Edição de plano' : 'Cadastro de plano'}</h1>
            <div>
              <button type="button" onClick={() => history.push('/plans')}>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                <span>VOLTAR</span>
              </button>
              <button type="submit" form="form-plans">
                <MdSave size={20} color="#fff" />
                <span>SALVAR</span>
              </button>
            </div>
          </Header>
          <form id="form-plans" onSubmit={handleSubmit}>
            <div>
              <span>TÍTULO DO PLANO</span>
              <input
                id="title"
                name="title"
                type="name"
                placeholder="Start"
                value={title || ''}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <span>
                DURAÇÃO (em meses)
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="1"
                  value={duration || ''}
                  onChange={({ target }) => setDuration(target.value)}
                />
              </span>
              <span>
                PREÇO MENSAL
                <NumberFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={2}
                  prefix="R$ "
                  name="price"
                  value={price || ''}
                  onChange={event => setPrice(event.target.value)}
                />
              </span>
              <span>
                PREÇO TOTAL
                <NumberFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={2}
                  prefix="R$ "
                  name="total"
                  value={total || ''}
                  disabled
                />
              </span>
            </div>
          </form>
        </>
      )}
    </Container>
  );
}
