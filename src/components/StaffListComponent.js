import React, { useReducer, useState, useRef } from "react";
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
  Row,
  Col,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade } from "react-animation-components";

let i = 0;
const reg = /^\d+(\.\d+)?$/;
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !val || reg.test(val);

const RenderStaff = ({ staff }) => {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card id="staffName" className="mt-0 p-0">
        <Link to={`/nhanvien/${staff.id}`}>
          <div className="inner mt-0 pt-0">
            <CardImg src={staff.image} alt={staff.name} />
          </div>
          <CardBody className="text-center p-3">
            <CardTitle className="m-0">{staff.name}</CardTitle>
          </CardBody>
        </Link>
      </Card>
    </FadeTransform>
  );
};

const StaffList = (props) => {
  //Set column display
  const [column, setColumn] = useState("col-12 col-md-6 col-lg-4 my-3");
  //Set search query to empty string
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialState = {
    name: "",
    doB: "",
    salaryScale: "",
    startDate: "",
    departmentId: "Dept01",
    annualLeave: "",
    overTime: "",
    image: "/assets/images/alberto.png",
    touched: {
      doB: false,
      startDate: false,
    },
  };

  const [newStaff, setNewStaff] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const stateRef = useRef(newStaff);
  stateRef.current = newStaff;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      id: props.staffs.length ? this.props.staffs.length : 1,
      [name]: value,
    });
  };

  const HandleSubmit = (values) => {
    toggleModal();
    setNewStaff(values);
  };

  const handleBlur = (field) => (evt) => {
    setNewStaff({
      touched: { ...newStaff.touched, [field]: true },
    });
  };

  // Validate logic
  const validate = (doB, startDate) => {
    const errors = {
      doB: "",
      startDate: "",
    };

    //doB
    if (newStaff.touched.doB && doB.length < 1) {
      errors.doB = "Vui lòng không bỏ trống";
    }

    //startDay
    if (newStaff.touched.startDate && startDate.length < 1) {
      errors.startDate = "Vui lòng không bỏ trống";
    }
    return errors;
  };

  // Function returns all the items
  // that match searchParam array if the indexOF() is > -1
  const search = (items) => {
    return items.filter((item) => {
      if (q === "") {
        return item;
      } else if (item.name.toString().toLowerCase().includes(q.toLowerCase()))
        return item;
      return 0;
    });
  };

  const staff = search(props.staffs.staffs).map((staff) => {
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

  const errors = validate(newStaff.doB, newStaff.startDate);

  // Render HTML
  if (props.staffs.isLoading) {
    return (
      <>
        <div className="jumbotron">
          <h1>DANH SÁCH NHÂN VIÊN</h1>
        </div>
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      </>
    );
  } else if (props.staffs.errMess) {
    return (
      <>
        <div className="jumbotron">
          <h1>DANH SÁCH NHÂN VIÊN</h1>
        </div>
        <div className="container">
          <div className="row">
            <h4>{props.staffs.errMess}</h4>
          </div>
        </div>
      </>
    );
  } else if (props.staffs.staffs != null) {
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
                        {
                          setQ(e.target.value);
                        }
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
          <Fade in>
            <div className="row">
              {/* Add new member */}
              <div className="col-6 col-md-6 col-lg-6">
                <Modal isOpen={isModalOpen}>
                  <ModalHeader toggle={toggleModal} close={closeBtn}>
                    Thêm Nhân Viên
                  </ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(values) => HandleSubmit(values)}>
                      <Row>
                        <Label htmlFor="name" md={12}>
                          Tên
                        </Label>
                        <Col md={12}>
                          <Control.text
                            id="name"
                            name="name"
                            placeholder="Tên nhân viên"
                            model=".name"
                            className="form-control"
                            validators={{
                              required,
                              minLength: minLength(3),
                              maxLength: maxLength(30),
                            }}
                          />
                          <Errors
                            model=".name"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Vui lòng không để trống. ",
                              minLength: "Nhập tối thiểu 3 ký tự.",
                              maxLength: "Vui lòng nhập tối đa 30 ký tự.",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="doB" md={12}>
                          Ngày sinh
                        </Label>
                        <Col md={12}>
                          <Input
                            type="date"
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
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="startDate" md={12}>
                          Ngày vào công ty
                        </Label>
                        <Col md={12}>
                          <Input
                            type="date"
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
                      </Row>
                      <Row>
                        <Label htmlFor="departmentId" md={12}>
                          Phòng ban
                        </Label>
                        <Col md={12}>
                          <Control.select
                            id="departmentId"
                            name="departmentId"
                            model=".departmentId"
                            className="form-control"
                          >
                            <option value="Dept01">Sale</option>
                            <option value="Dept02">HR</option>
                            <option value="Dept03">Marketing</option>
                            <option value="Dept04">IT</option>
                            <option value="Dept05">Finance</option>
                          </Control.select>
                        </Col>
                      </Row>
                      <Row>
                        <Label htmlFor="salaryScale" md={12}>
                          Hệ số lương
                        </Label>
                        <Col md={12}>
                          <Control.text
                            id="salaryScale"
                            name="salaryScale"
                            placeholder="Nhập Hệ số lương"
                            model=".salaryScale"
                            className="form-control"
                            validators={{
                              required,
                              isNumber,
                            }}
                          />
                          <Errors
                            model=".salaryScale"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Vui lòng không để trống. ",
                              isNumber: "Hệ số lương chỉ bao gồm số",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Label htmlFor="annualLeave" md={12}>
                          Số ngày nghỉ còn lại
                        </Label>
                        <Col md={12}>
                          <Control.text
                            id="annualLeave"
                            name="annualLeave"
                            placeholder="Nhập số ngày nghỉ còn lại"
                            model=".annualLeave"
                            className="form-control"
                            validators={{
                              required,
                              isNumber,
                            }}
                          />
                          <Errors
                            model=".annualLeave"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Vui lòng không để trống. ",
                              isNumber: "Số ngày chỉ bao gồm số",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Label htmlFor="overTime" md={12}>
                          Số ngày đã làm thêm
                        </Label>
                        <Col md={12}>
                          <Control.text
                            id="overTime"
                            name="overTime"
                            placeholder="Nhập số ngày làm thêm"
                            model=".overTime"
                            className="form-control"
                            validators={{
                              required,
                              isNumber,
                            }}
                          />
                          <Errors
                            model=".overTime"
                            className="text-danger"
                            show="touched"
                            messages={{
                              required: "Vui lòng không để trống. ",
                              isNumber: "Số ngày chỉ bao gồm số",
                            }}
                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <Button
                          type="submit"
                          value="submit"
                          color="primary"
                          className="mt-3"
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </LocalForm>
                  </ModalBody>
                </Modal>
                <Button color="dark" onClick={toggleModal}>
                  <span className="fa fa-plus-circle fa-lg"></span>{" "}
                  <span className="d-none d-md-inline">Thêm nhân viên</span>
                </Button>
              </div>
              {/* Change layout button */}
              <div className="col-6 col-md-6 col-lg-6">
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
          </Fade>
          <hr />
          <div className="row">{staff}</div>
        </div>
      </>
    );
  }
};

export default StaffList;
