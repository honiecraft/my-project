import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    // Fetch staffs
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        staffs: action.payload,
      };

    case ActionTypes.STAFFS_LOADING:
      return { ...state, isLoading: true, staffs: [] };

    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
