import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Staffs } from "./staffs";
import { StaffsSalary } from "./staffSalary";
import { Departments } from "./departments";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      staffsSalary: StaffsSalary,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
