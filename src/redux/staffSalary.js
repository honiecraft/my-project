import * as ActionTypes from "./ActionTypes";

export const StaffsSalary = (
  state = {
    isLoading: true,
    errMess: null,
    staffsSalary: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFSAL:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffsSalary: action.payload,
      };

    case ActionTypes.STAFFSAL_LOADING:
      return { ...state, isLoading: true, errMess: null, staffsSalary: [] };

    case ActionTypes.STAFFSAL_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
