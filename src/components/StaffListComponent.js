import React, { useReducer, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Col,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

let i = 0;

const RenderStaff = ({ staff }) => {
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
};

const StaffList = (props) => {
  //Set column display
  const [column, setColumn] = useState("col-12 col-md-6 col-lg-4 my-3");
  //Set search query to empty string
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState = {
    name: "",
    doB: "",
    salaryScale: "",
    startDate: "",
    department: "Sale",
    annualLeave: "",
    overTime: "",
    image: "/assets/images/alberto.png",
    touched: {
      name: false,
      doB: false,
      salaryScale: false,
      startDate: false,
      department: false,
      annualLeave: false,
      overTime: false,
    },
  };
  const [newStaff, setNewStaff] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewStaff(initialState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newStaff.touched).some((val) => val === false)) {
      setNewStaff(
        Object.keys(newStaff.touched).forEach((key) => {
          newStaff.touched[key] = true;
        })
      );
    } else if (Object.values(errors).join("") == false) {
      toggleModal();
      props.addStaff(newStaff);
      setNewStaff(initialState);
    }
  };

  const handleBlur = (field) => (evt) => {
    setNewStaff({
      touched: { ...newStaff.touched, [field]: true },
    });
  };

  // Validate logic
  const validate = (
    name,
    doB,
    startDate,
    salaryScale,
    annualLeave,
    overTime
  ) => {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };

    //Name
    if (newStaff.touched.name && name.length < 3) {
      errors.name = "Vui lòng nhập tối thiểu 3 ký tự";
    } else if (newStaff.touched.name && name.length > 30) {
      errors.name = "Vui lòng nhập tối đa 30 ký tự";
    }

    const regexddmmyyyy =
      /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/]\d\d\d\d$/;
    //doB
    if (newStaff.touched.doB && doB.length < 1) {
      errors.doB = "Vui lòng không bỏ trống";
    } else if (newStaff.touched.doB && !regexddmmyyyy.test(doB)) {
      errors.doB = "Vui lòng nhập theo định dạng dd/mm/yyyy";
    }

    //startDay
    if (newStaff.touched.startDate && startDate.length < 1) {
      errors.startDate = "Vui lòng không bỏ trống";
    } else if (newStaff.touched.startDate && !regexddmmyyyy.test(startDate)) {
      errors.startDate = "Vui lòng nhập theo định dạng dd/mm/yyyy";
    }

    //Salary Scale
    const reg = /^\d+(\.\d+)?$/;
    if (newStaff.touched.salaryScale && salaryScale.length < 1) {
      errors.salaryScale = "Vui lòng không bỏ trống";
    } else if (newStaff.touched.salaryScale && !reg.test(salaryScale)) {
      errors.salaryScale = "Hệ số lương chỉ bao gồm số";
    }

    //Annual Leave
    if (newStaff.touched.annualLeave && annualLeave.length < 1) {
      errors.annualLeave = "Vui lòng không bỏ trống";
    } else if (newStaff.touched.annualLeave && !reg.test(annualLeave)) {
      errors.annualLeave = "Số ngày chỉ bao gồm số";
    }

    //Overtime
    if (newStaff.touched.overTime && overTime.length < 1) {
      errors.overTime = "Vui lòng không bỏ trống";
    } else if (newStaff.touched.overTime && !reg.test(overTime)) {
      errors.overTime = "Số ngày chỉ bao gồm số";
    }
    return errors;
  };

  // Function returns all the items
  //that match searchParam array if the indexOF() is > -1
  const search = (items) => {
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
  };

  const staff = search(props.staffs).map((staff) => {
    return (
      <div key={staff.id} className={column}>
        <RenderStaff staff={staff} />
      </div>
    );
  });

  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );

  const errors = validate(
    newStaff.name,
    newStaff.doB,
    newStaff.startDate,
    newStaff.salaryScale,
    newStaff.annualLeave,
    newStaff.overTime
  );

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
          {/* Filtered by Department */}
          <div className="col-4 col-md-3 col-lg-3">
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
          {/* Add new member */}
          <div className="col-4 col-md-5 col-lg-6 text-center">
            <Modal isOpen={isModalOpen}>
              <ModalHeader toggle={toggleModal} close={closeBtn}>
                Thêm Nhân Viên
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={(values) => handleSubmit(values)}>
                  <FormGroup row>
                    <Label htmlFor="name" md={12}>
                      Tên
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tên nhân viên"
                        value={newStaff.name}
                        valid={errors.name === ""}
                        invalid={errors.name !== ""}
                        onBlur={handleBlur("name")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="doB" md={12}>
                      Ngày sinh
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="doB"
                        name="doB"
                        placeholder="dd/mm/yyyy"
                        value={newStaff.doB}
                        valid={errors.doB === ""}
                        invalid={errors.doB !== ""}
                        onBlur={handleBlur("doB")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.doB}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="startDate" md={12}>
                      Ngày vào công ty
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="startDate"
                        name="startDate"
                        placeholder="dd/mm/yyyy"
                        value={newStaff.startDate}
                        valid={errors.startDate === ""}
                        invalid={errors.startDate !== ""}
                        onBlur={handleBlur("startDate")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.startDate}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="department" md={12}>
                      Phòng ban
                    </Label>
                    <Col md={12}>
                      <Input
                        type="select"
                        id="department"
                        name="department"
                        value={newStaff.department}
                        onChange={handleInputChange}
                      >
                        <option value="Sale">Sale</option>
                        <option value="HR">HR</option>
                        <option value="Marketing">Marketing</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                      </Input>
                      <FormFeedback>{errors.department}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="salaryScale" md={12}>
                      Hệ số lương
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="salaryScale"
                        name="salaryScale"
                        placeholder="Nhập Hệ số lương"
                        value={newStaff.salaryScale}
                        valid={errors.salaryScale === ""}
                        invalid={errors.salaryScale !== ""}
                        onBlur={handleBlur("salaryScale")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.salaryScale}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="annualLeave" md={12}>
                      Số ngày nghỉ còn lại
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="annualLeave"
                        name="annualLeave"
                        placeholder="Nhập số ngày nghỉ còn lại"
                        value={newStaff.annualLeave}
                        valid={errors.annualLeave === ""}
                        invalid={errors.annualLeave !== ""}
                        onBlur={handleBlur("annualLeave")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.annualLeave}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label htmlFor="overTime" md={12}>
                      Số ngày đã làm thêm
                    </Label>
                    <Col md={12}>
                      <Input
                        type="text"
                        id="overTime"
                        name="overTime"
                        placeholder="Nhập số ngày làm thêm"
                        value={newStaff.overTime}
                        valid={errors.overTime === ""}
                        invalid={errors.overTime !== ""}
                        onBlur={handleBlur("overTime")}
                        onChange={handleInputChange}
                      />
                      <FormFeedback>{errors.overTime}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" value="submit" color="primary">
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <Button color="dark" onClick={toggleModal}>
              <span className="fa fa-plus-circle fa-lg"></span>{" "}
              <span className="d-none d-md-inline">Thêm nhân viên</span>
            </Button>
          </div>
          {/* Change layout button */}
          <div className="col-4 col-md-4 col-lg-3">
            <Button
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
              <span className="fa fa-th"></span>{" "}
              <span className="d-none d-md-inline">Change layout</span>
            </Button>
          </div>
        </div>
        <hr />
        <div className="row">{staff}</div>
      </div>
    </>
  );
};
export default StaffList;
