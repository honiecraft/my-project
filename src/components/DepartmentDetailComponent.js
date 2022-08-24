import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade } from "react-animation-components";

// Render Department detail
function RenderStaff({ staff }) {
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
}

const DepartmentDetail = (props) => {
  console.log(props);
  const staff = props.staff.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-3">
        <RenderStaff staff={staff} />
      </div>
    );
  });
  // Display Breadcrumb and render function
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
  } else if (props.staff != null) {
    return (
      <>
        <div className="jumbotron">
          {/* Title */}
          <h1>PHÒNG BAN</h1>
        </div>
        <div className="container">
          <div className="row px-0">
            <Breadcrumb className="col-12 px-0">
              <BreadcrumbItem>
                <Link to="/phongban">Phòng ban</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.departments.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <hr />
          <div className="row">{staff}</div>
        </div>
      </>
    );
  }
};

export default DepartmentDetail;
