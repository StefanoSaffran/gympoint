import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

export function* storeStudent({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const { data } = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Aluno cadastrado com sucesso');
    history.push(`/students/${data.id}`);
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) ||
        'Erro de comunicação com o servidor'
    );
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload;

    yield call(api.put, `students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Aluno atualizado com sucesso');
    history.push('/students');
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) ||
        'Erro de comunicação com o servidor'
    );
    // yield put(studentsFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `students/${id}`);

    toast.success('Aluno excluido com sucesso');
  } catch (err) {
    toast.error(
      (err.response && err.response.data.error) ||
        'Erro de comunicação com o servidor'
    );
  }
}

export default all([
  takeLatest('@students/STORE_STUDENTS_REQUEST', storeStudent),
  takeLatest('@students/UPDATE_STUDENTS_REQUEST', updateStudent),
  takeLatest('@students/DELETE_STUDENTS_REQUEST', deleteStudent),
]);
