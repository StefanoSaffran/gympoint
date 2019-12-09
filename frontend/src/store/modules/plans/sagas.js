import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

export function* storePlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    const { data } = yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    toast.success('Plano cadastrado com sucesso');
    history.push(`/plans/${data.id}`);
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) ||
        'Erro de comunicação com o servidor'
    );
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    yield call(api.put, `plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success('Plano atualizado com sucesso');
    history.push('/plans');
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) ||
        'Erro de comunicação com o servidor'
    );
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    toast.success('Plano excluido com sucesso');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export default all([
  takeLatest('@plans/STORE_PLAN_REQUEST', storePlan),
  takeLatest('@plans/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plans/DELETE_PLAN_REQUEST', deletePlan),
]);
