import React, { Component } from "react";
import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import StaffList from "./components/StaffListComponent";
import { STAFFS } from "./shared/staffs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { staffs: STAFFS };
  }

  render() {
    return (
      <div>
        <Navbar dark color="secondary">
          <div className="container">
            <NavbarBrand className="font-weight-bold" href="/">
              Ứng dụng quản lí nhân sự v1.0
            </NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
