export function storePlanRequest(title, duration, price) {
  return {
    type: '@plans/STORE_PLAN_REQUEST',
    payload: { title, duration, price },
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: '@plans/UPDATE_PLAN_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plans/DELETE_PLAN_REQUEST',
    payload: { id },
  };
}
