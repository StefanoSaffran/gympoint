import { takeLatest, call, all, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';
import { signInSuccess, signFailure, signOut } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    console.tron.log();
    const { data } = yield call(api.get, `students/${id}/checkins`);
    yield put(signInSuccess(data.membership, data.student));
  } catch (err) {
    console.tron.log(err);
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
  const { profile } = payload;
  try {
    const { data } = yield call(api.get, `students/${profile.id}/checkins`);

    if (!data.membership || !data.student) {
      yield put(signOut());
    }
  } catch (error) {}
}

export default all([
  takeLatest('persist/REHYDRATE', verifyUser),
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
]);
