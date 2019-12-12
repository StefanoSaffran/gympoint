import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { MdKeyboardArrowLeft, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { unFormat, formatPrice } from '~/helpers/format';
import Loading from '~/components/Loading';
import history from '~/services/history';
import api from '~/services/api';
import { Container, Header } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Campo plano é obrigatório'),
  duration: Yup.number()
    .required('Campo duração é obrigatório')
    .integer()
    .positive('Duração precisa ser positivo'),
  price: Yup.number()
    .required('Campo preço é obrigatório')
    .positive('Preço precisa ser positivo'),
});

export default function StorePlans() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const getPlan = async () => {
        const { data } = await api.get(`/plans/${id}`);

        setTitle(data.title);
        setDuration(data.duration);
        setPrice(formatPrice(data.price));
        setLoading(false);
      };

      getPlan();
    }
  }, [id]);

  const total = useMemo(() => {
    return formatPrice(unFormat(price) * duration);
  }, [duration, price]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await schema.validate(
        {
          title,
          duration,
          price: unFormat(price),
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      err.inner.forEach((error: ValidationError) => {
        toast.error(error.message);
      });
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await api.put(`plans/${id}`, {
          title,
          duration,
          price: unFormat(price),
        });

        toast.success('Plano atualizado com sucesso');
        history.push('/plans');
      } else {
        const { data } = await api.post('plans', {
          title,
          duration,
          price: unFormat(price),
        });

        toast.success('Plano cadastrado com sucesso');
        history.push(`/plans/${data.id}`);
      }
    } catch (err) {
      toast.error(
        (err.response && err.response.data.error) ||
          'Erro de comunicação com o servidor'
      );
    } finally {
      setLoading(false);
    }
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
              <label>TÍTULO DO PLANO</label>
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
              <label>
                DURAÇÃO (em meses)
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="1"
                  value={duration || ''}
                  onChange={({ target }) => setDuration(target.value)}
                />
              </label>
              <label>
                PREÇO MENSAL
                <NumberFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale={2}
                  prefix="R$ "
                  name="price"
                  value={price || ''}
                  onChange={({ target }) => setPrice(target.value)}
                />
              </label>
              <label>
                PREÇO TOTAL
                <input type="text" name="total" value={total || ''} disabled />
              </label>
            </div>
          </form>
        </>
      )}
    </Container>
  );
}
