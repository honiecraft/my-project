import {
  Card,
  CardHeader,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade} from "react-animation-components";

// Render payroll function
const RenderPayroll = ({ staff }) => {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "translateY(50%)",
      }}
    >
      <Card
        style={{
          borderRadius: "20px",
        }}
        className=" text-secondary"
      >
        <CardHeader
          style={{
            backgroundColor: "#2F4858",
            color: "white",
            borderRadiusTop: "20px",
          }}
          tag="h5"
        >
          {staff.name}
        </CardHeader>
        <CardBody className="">
          <p>Mã nhân viên: {staff.id}</p>
          <p>Hệ số lương: {staff.salaryScale}</p>
          <p>Số ngày làm thêm: {staff.overTime}</p>
          <Button
            style={{
              backgroundColor: "#A8EB12",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Lương:{" "}
            {(
              staff.salaryScale * 3000000 +
              staff.overTime * 200000
            ).toLocaleString("en-US")}
          </Button>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

const Payroll = (props) => {
  // Set state
  const [sortSal, setSortSal] = useState(false);
  // Call function render with props staff
  const salary = props.staffsSalary
    .sort((a, b) =>
      sortSal ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale
    )
    .map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-2">
          {<RenderPayroll staff={staff} />}
        </div>
      );
    });

  // Display Breadcrumb and Render function
  // if (props.isLoading) {
  //   return (
  //     <>
  //       <div className="jumbotron">
  //         <h1>BẢNG LƯƠNG</h1>
  //       </div>
  //       <div className="container">
  //         <div className="row">
  //           <Loading />
  //         </div>
  //       </div>
  //     </>
  //   );
  // } else if (props.errMess) {
  //   return (
  //     <>
  //       <div className="jumbotron">
  //         <h1>BẢNG LƯƠNG</h1>
  //       </div>
  //       <div className="container">
  //         <div className="row">
  //           <h4>{props.errMess}</h4>
  //         </div>
  //       </div>
  //     </>
  //   );
  // } else if (props.staffsSalary != null) {
    return (
      <>
        <div className="jumbotron">
          {/* Title */}
          <h1>BẢNG LƯƠNG</h1>
          <Button
            className="mt-3"
            color="warning"
            onClick={() => {
              return setSortSal(!sortSal);
            }}
          >
            <i className="fa fa-sort"></i>
            <span> Sắp xếp theo Hệ số lương</span>
          </Button>
        </div>
        <Fade in>
          <div className="container">
            <div className="col-12">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/stafflist">Nhân viên</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div className="row">{salary}</div>
          </div>
        </Fade>
      </>
    );
  // }
};

export default Payroll;
