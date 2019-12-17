import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `students/${id}/checkins`);
    yield put(signInSuccess(data.membership, data.student));
  } catch (err) {
    yield put(signFailure());
    Alert.alert(
      'Falha ao realizar login',
      err.response
        ? err.response.data.error
        : 'Erro de comunicação com servidor'
    );
  }
}

export function signOut() {}

export default all([
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
  takeLatest('@student/SIGN_OUT', signOut),
]);
