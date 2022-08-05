import { Breadcrumb, BreadcrumbItem, Media, Card } from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

// Render staff information function
function RenderStaffInfor({ staff }) {
  return (
    <div className="container">
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
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>
            Phòng ban:{" "}
            {staff.department.name ? staff.department.name : staff.department}
          </p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày đã làm thêm: {staff.overTime}</p>
        </Media>
      </Media>
    </div>
  );
}

const StaffInfor = (props) => {
  // Display Breadcrumb and render function
  return (
    <>
      <div className="jumbotron">
        {/* Title */}
        <h1>THÔNG TIN CÁ NHÂN</h1>
      </div>
      <div className="container">
        <div className="row px-0">
          <Breadcrumb className="col-12 px-0">
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <RenderStaffInfor staff={props.staff} />
        </div>
      </div>
    </>
  );
};

export default StaffInfor;
