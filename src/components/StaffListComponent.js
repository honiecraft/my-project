import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

let i = 0;

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      columnDefault: "col-12 col-md-6 col-lg-4 my-1",
    };
  }

  //Set selectedStaff
  detailStaff(staff) {
    this.setState({ selectedStaff: staff });
  }

  //Set column display
  displayColumn(col) {
    this.setState({ columnDefault: col });
  }

  // Render HTML
  render() {
    // Storing Staff name
    const staff = this.props.staffs.map((staff) => {
      return (
        <div className={this.state.columnDefault}>
          <Card
            id="staffName"
            key={staff.id}
            // Adding click event
            onClick={(e) => {
              // Call function to set selected staff
              this.detailStaff(staff);
              // Showing active name
              document
                .querySelectorAll("#staffName")
                // Remove active class in all staff name
                .forEach((f) => f.classList.remove("active"));
              // Adding class active to selected staff
              e.target.closest("#staffName").classList.add("active");
            }}
          >
            <CardBody className="p-2">
              <CardTitle className="m-0">{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });

    // Staff infor
    const staffInfor = (staff) => {
      // Check selected staff
      if (staff != null) {
        return (
          <div className={this.state.columnDefault}>
            <Card color="secondary">
              <CardBody className="p-2 text-light">
                <ul className="list-unstyled">
                  <li className="p-3">
                    <h4>Họ và tên: {staff.name}</h4>
                    <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                    <p>
                      Ngày vào công ty:{" "}
                      {dateFormat(staff.startDate, "dd/mm/yyyy")}
                    </p>
                    <p>Phòng ban: {staff.department.name}</p>
                    <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                    <p>Số ngày đã làm thêm: {staff.overTime}</p>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        );
      } else
        return <p className="pl-3">Bấm vào tên nhân viên để xem thông tin.</p>;
    };

    // Render HTML
    return (
      <div className="container mt-3">
        <button
          type="button"
          className="btn btn-warning my-2"
          onClick={() => {
            // only apply for lg & md screen
            const layout = [
              "col-12 col-md-4 col-lg-2 my-1",
              "col-12 col-md-6 col-lg-4 my-1",
              "col-12 col-md-12 col-lg-12 my-1",
            ];

            if (i >= 0 && i < layout.length) {
              this.displayColumn(layout[i]);
              i++;
              return i;
            } else {
              this.displayColumn(layout[0]);
              return (i = 0);
            }
          }}
        >
          Change layout
        </button>
        <div className="row">{staff}</div>
        <div className="row">{staffInfor(this.state.selectedStaff)}</div>
      </div>
    );
  }
}
export default StaffList;
