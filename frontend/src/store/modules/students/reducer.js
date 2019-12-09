import produce from 'immer';

const initial_state = {
  students: null,
};

export default function students(state = initial_state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/STUDENTS_FAILURE': {
        break;
      }
      default:
    }
  });
}
