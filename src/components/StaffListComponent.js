import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Form,
  InputGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

let i = 0;

function RenderStaff({ staff }) {
  return (
    <Card id="staffName" className="mt-0 p-0">
      <Link to={`/nhanvien/${staff.id}`}>
        <div className="inner mt-0 pt-0">
          <CardImg src={staff.image} />
        </div>
        <CardBody className="text-center p-3">
          <CardTitle className="m-0">{staff.name}</CardTitle>
        </CardBody>
      </Link>
    </Card>
  );
}

const StaffList = (props) => {
  //Set column display
  const [column, setColumn] = useState("col-12 col-md-6 col-lg-4 my-3");
  //Set search query to empty string
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [searchParam] = useState(["name"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    setItems(props.staffs);
  }, []);

  // Function returns all the items
  //that match searchParam array if the indexOF() is > -1
  function search(items) {
    return items.filter((item) => {
      // in here we check if department is equal to filter value
      // if it's equal to then only return the items that match
      // if not return All the staff
      if (item.department.name == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

  const staff = search(props.staffs).map((staff) => {
    return (
      <div key={staff.id} className={column}>
        <RenderStaff staff={staff} />
      </div>
    );
  });

  // Render HTML
  return (
    <>
      <div className="jumbotron">
        {/* Title */}
        <h1>DANH SÁCH NHÂN VIÊN</h1>
        {/* Search bar */}
        <div className="container">
          <div className="row mt-5">
            <div className="col-3"></div>
            <div className="col-6">
              <Form>
                <InputGroup>
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i
                        className="input-group-prepend fa fa-search"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <Input
                    className="form-control my-0 py-1 red-border"
                    type="search"
                    name="search-form"
                    id="search-form"
                    placeholder="Tìm kiếm tên nhân viên"
                    value={q}
                    onChange={(e) =>
                      // set the value of our useState q
                      setQ(e.target.value)
                    }
                  />
                </InputGroup>
              </Form>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-4 col-md-3 col-lg-2">
            <div className="select">
              <select
                // set the value to the selected value
                // and update the setFilterParam() state every time onChange is called
                onChange={(e) => {
                  setFilterParam(e.target.value);
                }}
                className="custom-select"
              >
                <option value="All">Phòng ban</option>
                <option value="Sale">Sale</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
          <div className="col-2 col-md-2 col-lg-4"></div>
          {/* Change layout button */}
          <div className="col-6 col-md-7 col-lg-6">
            <button
              type="button"
              className="btn btn-warning float-right"
              onClick={() => {
                // only apply for lg & md screen
                const layout = [
                  "col-12 col-md-4 col-lg-2 my-3",
                  "col-12 col-md-6 col-lg-4 my-3",
                  "col-12 col-md-12 col-lg-6 my-3",
                ];

                if (i >= 0 && i < layout.length) {
                  setColumn(layout[i]);
                  i++;
                  return i;
                } else {
                  setColumn(layout[0]);
                  return (i = 0);
                }
              }}
            >
              Change layout
            </button>
          </div>
        </div>
        <hr />
        <div className="row">{staff}</div>
      </div>
    </>
  );
};
export default StaffList;
