import { takeLatest, call, all, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';
import { signInSuccess, signFailure, signOut } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    if (!id) {
      yield put(signFailure());
      return;
    }
    const { data } = yield call(api.get, `students/${id}/checkins`);
    yield put(signInSuccess(data.membership, data.student));
  } catch (err) {
    yield put(signFailure());
    showMessage({
      message: 'Falha ao realizar login',
      description: err.response
        ? err.response.data.error
        : 'Erro de conexão com o servidor',
      type: 'danger',
    });
  }
}

export function* verifyUser({ payload }) {
  const { student } = payload;
  try {
    yield call(api.get, `students/${student.profile.id}/checkins`);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put(signOut());
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', verifyUser),
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
]);
