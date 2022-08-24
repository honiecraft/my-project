import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfor from "./StaffInforComponent";
import Department from "./DepartmentComponent";
import DepartmentDetail from "./DepartmentDetailComponent";
import Payroll from "./PayrollComponent";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDept,
  fetchStaffSal,
  postStaff,
  deleteStaff,
  updateStaff,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDept: () => dispatch(fetchDept()),
  fetchStaffSal: () => dispatch(fetchStaffSal()),
  postStaff: (staff) => dispatch(postStaff(staff)),
  deleteStaff: (id) => dispatch(deleteStaff(id)),
  updateStaff: (staff) => dispatch(updateStaff(staff)),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDept();
    this.props.fetchStaffSal();
  }

  render() {
    const StaffWithId = () => {
      let { id } = useParams();
      return (
        <StaffInfor
          staff={this.props.staffs.staffs.filter((staff) => staff.id == id)[0]}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          deleteStaff={this.props.deleteStaff}
          updateStaff={this.props.updateStaff}
          departments={this.props.departments.departments}
        />
      );
    };

    const StaffWithDept = () => {
      let { deptId } = useParams();
      return (
        <DepartmentDetail
          departments={
            this.props.departments.departments.filter(
              (dept) => dept.id == deptId
            )[0]
          }
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId == deptId
          )}
          isLoading={this.props.departments.isLoading}
          errMess={this.props.departments.errMess}
          staffsSalary={this.props.staffsSalary.staffsSalary}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Routes>
              <Route
                path="nhanvien"
                element={
                  <StaffList
                    staffs={this.props.staffs}
                    postStaff={this.props.postStaff}
                    departments={this.props.departments}
                  />
                }
              />
              <Route path="nhanvien/:id" element={<StaffWithId />} />
              <Route
                path="phongban"
                element={
                  <Department
                    staffs={this.props.staffs.staffs}
                    departments={this.props.departments.departments}
                    isLoading={this.props.departments.isLoading}
                    errMess={this.props.departments.errMess}
                  />
                }
              />
              <Route path="phongban/:deptId" element={<StaffWithDept />} />
              <Route
                path="luong"
                element={
                  <Payroll
                    staffsSalary={this.props.staffsSalary.staffsSalary}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/nhanvien" replace />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    const location = useLocation();
    return <Component history={history} location={location} {...props} />;
  };
  return Wrapper;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
