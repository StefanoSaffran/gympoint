import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  membership: null,
  signed: false,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.student;
        draft.membership = action.payload.membership;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@student/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/SIGN_OUT': {
        draft.signed = false;
        draft.profile = null;
        draft.membership = null;
        break;
      }
      default:
    }
  });
}
