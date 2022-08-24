import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

// Render department function
const RenderDepartment = ({ department, staffNo }) => {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardBody>
          <Link to={`/phongban/${department.id}`}>
            <CardTitle tag="h5">{department.name}</CardTitle>
          </Link>
          <CardText>Số lượng nhân viên: {staffNo.length}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

// Call function render with props department
const Department = (props) => {
  const department = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4 my-2">
        <RenderDepartment
          department={department}
          staffNo={props.staffs.filter(
            (staff) => staff.departmentId === department.id
          )}
        />
      </div>
    );
  });

  // Display Render function
  if (props.isLoading) {
    return (
      <>
        <div className="jumbotron">
          <h1>PHÒNG BAN</h1>
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
          <h1>PHÒNG BAN</h1>
        </div>
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </>
    );
  } else if (props.departments != null) {
    return (
      <>
        <div className="jumbotron">
          {/* Title */}
          <h1>PHÒNG BAN</h1>
        </div>
        <div className="container">
          <div className="row">{department}</div>
        </div>
      </>
    );
  }
};

export default Department;
