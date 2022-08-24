import * as ActionTypes from "./ActionTypes";

export const Departments = (
  state = {
    isLoading: true,
    errMess: null,
    departments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPT:
      return {
        ...state,
        isLoading: false,
        departments: action.payload,
      };

    case ActionTypes.DEPT_LOADING:
      return { ...state, isLoading: true, departments: [] };

    case ActionTypes.DEPT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
