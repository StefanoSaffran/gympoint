export function signInRequest(id) {
  return {
    type: '@student/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(membership, student) {
  return {
    type: '@student/SIGN_IN_SUCCESS',
    payload: { membership, student },
  };
}

export function signFailure() {
  return {
    type: '@student/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@student/SIGN_OUT',
  };
}
