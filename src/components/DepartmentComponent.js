import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";

// Render department function
const RenderDepartment = ({ department }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{department.name}</CardTitle>
        <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
      </CardBody>
    </Card>
  );
};

// Call function render with props department
const Department = (props) => {
  const department = props.departments.map((department) => {
    return (
      <div key={department.id} className="col-12 col-md-6 col-lg-4 my-2">
        <RenderDepartment department={department} />
      </div>
    );
  });

  // Display Render function
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
};

export default Department;
