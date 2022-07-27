import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffInfor from "./StaffInforComponent";
import Department from "./DepartmentComponent";
import Payroll from "./PayrollComponent";
import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const StaffWithId = () => {
      let params = useParams();
      return (
        <StaffInfor
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(params.id, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route
            path="nhanvien"
            element={
              <StaffList
                staffs={this.state.staffs}
                departments={this.state.departments}
              />
            }
          />
          <Route path="nhanvien/:id" element={<StaffWithId />} />
          <Route
            path="phongban"
            element={<Department departments={this.state.departments} />}
          />
          <Route
            path="luong"
            element={<Payroll staffs={this.state.staffs} />}
          />
          <Route path="*" element={<Navigate to="/nhanvien" replace />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
