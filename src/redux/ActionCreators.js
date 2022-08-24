import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//Fetch Staff List
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

// Post new staff
export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});
export const postStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaff(response)))
    .then(() => dispatch(fetchStaffSal()))
    .catch((error) => {
      console.log(`New Staff: ${error.message}`);
      alert(`Can not post New Staff\nError: ${error.message}`);
    });
};

//Delete Staff
export const deleteStaffSuccess = (id) => ({
  type: ActionTypes.DELETE_STAFF_SUCCESS,
  payload: id,
});

export const deleteStaffLoading = () => ({
  type: ActionTypes.DELETE_STAFF_LOADING,
});

export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Xác nhận xóa nhân viên?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE",
    })
      .then(() => dispatch(deleteStaffSuccess(id)))
      .then(() => dispatch(fetchStaffSal()));
  } else return;
};

// Update staff
export const updateStaffSuccess = (staff) => ({
  type: ActionTypes.UPDATE_STAFF_SUCCESS,
  payload: staff,
});

export const updateStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaffSuccess(response)))
    .then(() => dispatch(fetchStaffSal()))
    .catch((error) => {
      console.log(`Update Staff: ${error.message}`);
      alert(`Can not update Staff\nError: ${error.message}`);
    });
};

//Department
export const fetchDept = () => (dispatch) => {
  dispatch(deptLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((dept) => dispatch(addDept(dept)))
    .catch((error) => dispatch(deptFailed(error.message)));
};

export const deptLoading = () => ({
  type: ActionTypes.DEPT_LOADING,
});

export const deptFailed = (errmess) => ({
  type: ActionTypes.DEPT_FAILED,
  payload: errmess,
});

export const addDept = (dept) => ({
  type: ActionTypes.ADD_DEPT,
  payload: dept,
});

//Staff Salary
export const fetchStaffSal = () => (dispatch) => {
  dispatch(staffSalLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((staffSal) => dispatch(addStaffSal(staffSal)))
    .catch((error) => dispatch(staffSalFailed(error.message)));
};

export const staffSalLoading = () => ({
  type: ActionTypes.STAFFSAL_LOADING,
});

export const staffSalFailed = (errmess) => ({
  type: ActionTypes.STAFFSAL_FAILED,
  payload: errmess,
});

export const addStaffSal = (staffSal) => ({
  type: ActionTypes.ADD_STAFFSAL,
  payload: staffSal,
});
