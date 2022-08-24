import React, { useReducer, useState, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import dateFormat from "dateformat";
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

// Render staff information function
function RenderStaffInfor({ staff, departments }) {
  if (staff != null && departments != null) {
    return (
      <div className="container">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "translateY(50px)",
          }}
        >
          <Media
            outline
            className="bg-light row"
            style={{
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Media left middle className="col-12 col-md-4 col-lg-3 pl-0">
              <Media object width="100%" src={staff.image} alt={staff.name} />
            </Media>
            <Media body className="col-12 col-md-8 col-lg-9 mt-3">
              <Media heading>Họ và tên: {staff.name}</Media>
              <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
              <p>
                Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
              </p>
              <p>Phòng ban: {departments.name}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày đã làm thêm: {staff.overTime}</p>
            </Media>
          </Media>
        </FadeTransform>
      </div>
    );
  } else return <></>;
}

const StaffInfor = (props) => {
  // Edit form
  const EditForm = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const initialState = {
      id: props.staff.id,
      name: props.staff.name,
      doB: props.staff.doB,
      salaryScale: props.staff.salaryScale,
      startDate: props.staff.startDate,
      departmentId: props.staff.departmentId,
      annualLeave: props.staff.annualLeave,
      overTime: props.staff.overTime,
      image: "/assets/images/alberto.png",
    };

    const [updateStaff, setUpdateStaff] = useReducer(
      (state, updates) => ({ ...state, ...updates }),
      initialState
    );

    const stateRef = useRef(updateStaff);
    stateRef.current = updateStaff;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdateStaff({
        [name]: value,
      });
    };

    const HandleSubmit = (values) => {
      toggleModal();
      setUpdateStaff(values);

      setTimeout(() => {
        props.updateStaff(stateRef.current);
        console.log(updateStaff);
      }, 0);
    };

    const closeBtn = (
      <button className="close" onClick={toggleModal}>
        &times;
      </button>
    );

    // Render HTML
    return (
      <>
        <Button type="button" className="btn btn-light" onClick={toggleModal}>
          <i className="fa fa-edit"></i>
          <span> Chỉnh sửa</span>
        </Button>
        {/* Add new member */}
        <Modal isOpen={isModalOpen}>
          <ModalHeader toggle={toggleModal} close={closeBtn}>
            Cập nhật thông tin
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
                    defaultValue={props.staff.name}
                    model=".name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                    onUpdate={handleInputChange}
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
              <Row>
                <Label htmlFor="id" md={12}></Label>
                <Col md={12}>
                  <Control.text
                    type="hidden"
                    id="id"
                    name="id"
                    value={props.staff.id}
                    model=".id"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row>
                <Label htmlFor="doB" md={12}>
                  Ngày sinh
                </Label>
                <Col md={12}>
                  <Control.text
                    type="date"
                    id="doB"
                    name="doB"
                    defaultValue={props.staff.doB}
                    model=".doB"
                    className="form-control"
                    validators={{
                      required,
                    }}
                    onUpdate={handleInputChange}
                  />
                  <Errors
                    model=".doB"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Vui lòng không để trống. ",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Label htmlFor="startDate" md={12}>
                  Ngày vào công ty
                </Label>
                <Col md={12}>
                  <Control.text
                    type="date"
                    id="startDate"
                    name="startDate"
                    defaultValue={props.staff.startDate}
                    model=".startDate"
                    className="form-control"
                    validators={{
                      required,
                    }}
                    onUpdate={handleInputChange}
                  />
                  <Errors
                    model=".startDate"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Vui lòng không để trống. ",
                    }}
                  />
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
                    defaultValue={props.staff.departmentId}
                    model=".departmentId"
                    className="form-control"
                    onUpdate={handleInputChange}
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
                    defaultValue={props.staff.salaryScale}
                    placeholder="Nhập Hệ số lương"
                    model=".salaryScale"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                    onUpdate={handleInputChange}
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
                    defaultValue={props.staff.annualLeave}
                    placeholder="Nhập số ngày nghỉ còn lại"
                    model=".annualLeave"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                    onUpdate={handleInputChange}
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
                    defaultValue={props.staff.overTime}
                    placeholder="Nhập số ngày làm thêm"
                    model=".overTime"
                    className="form-control"
                    validators={{
                      required,
                      isNumber,
                    }}
                    onUpdate={handleInputChange}
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
                  Update
                </Button>
              </FormGroup>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  };

  // Display Breadcrumb and render function
  if (props.isLoading) {
    return (
      <>
        <div className="jumbotron">
          <h1>THÔNG TIN CÁ NHÂN</h1>
        </div>
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      </>
    );
  } else if (props.errMess) {
    return (
      <>
        <div className="jumbotron">
          <h1>THÔNG TIN CÁ NHÂN</h1>
        </div>
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </>
    );
  } else if (props.staff != null) {
    return (
      <>
        <div className="jumbotron">
          {/* Title */}
          <h1>THÔNG TIN CÁ NHÂN</h1>
          <div className="container mt-5">
            <div
              className="
            row d-flex justify-content-center"
            >
              {/* Edit Form */}
              <EditForm
                staff={props.staff}
                departments={props.departments}
                updateStaff={props.updateStaff}
              />
              {/* Delete button */}
              <Link to={`/nhanvien`}>
                <Button
                  className="ml-5 btn btn-dark"
                  onClick={() => {
                    props.deleteStaff(props.staff.id);
                  }}
                >
                  <i className="fa fa-close"></i>
                  <span> Xóa nhân viên</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <Fade in>
            <div className="row py-0">
              <Breadcrumb className="col-12 py-0">
                <BreadcrumbItem>
                  <Link to="/nhanvien">Nhân viên</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Fade>
          <div className="row">
            <RenderStaffInfor
              staff={props.staff}
              departments={
                props.departments.filter(
                  (dept) => dept.id == props.staff.departmentId
                )[0]
              }
            />
          </div>
        </div>
      </>
    );
  }
};

export default StaffInfor;
