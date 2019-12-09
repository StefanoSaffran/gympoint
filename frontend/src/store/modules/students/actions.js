export function storeStudentsRequest(data) {
  return {
    type: '@students/STORE_STUDENTS_REQUEST',
    payload: { ...data },
  };
}

export function updateStudentsRequest(data, id) {
  return {
    type: '@students/UPDATE_STUDENTS_REQUEST',
    payload: { ...data, id },
  };
}

export function deleteStudentsRequest(id) {
  return {
    type: '@students/DELETE_STUDENTS_REQUEST',
    payload: { id },
  };
}

export function studentsFailure() {
  return {
    type: '@students/STUDENTS_FAILURE',
  };
}
