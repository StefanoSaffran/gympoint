import produce from 'immer';

const initial_state = {
  id: null,
  signed: false,
  loading: false,
};

export default function student(state = initial_state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/SIGN_IN_SUCCESS': {
        draft.id = action.payload.id;
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
        break;
      }
      default:
    }
  });
}
