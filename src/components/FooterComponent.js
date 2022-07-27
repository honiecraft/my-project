import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer mt-5">
      <div className="container">
        {/* Footer's address */}
        <div className="footer-content">
          <h1>HONIE CRAFT</h1>
          <p className="">
            Sứ mệnh của chúng tôi là xây dựng và phát triển các sản phẩm tuyệt
            vời giúp Doanh nghiệp tăng trưởng lợi ích, giải quyết khó khăn, hoàn
            thành nhanh chóng công việc của mình.
          </p>
        </div>
        {/* Footer's social icon */}
        <div className="align-self-center">
          <div className="text-center">
            <a className="btn btn-social-icon" href="http://google.com/+">
              <i className="fa fa-google"></i>
            </a>
            <a
              className="btn btn-social-icon"
              href="http://www.facebook.com/profile.php?id="
            >
              <i className="fa fa-facebook"></i>
            </a>
            <a
              className="btn btn-social-icon"
              href="http://www.linkedin.com/in/"
            >
              <i className="fa fa-linkedin"></i>
            </a>
            <a className="btn btn-social-icon" href="http://twitter.com/">
              <i className="fa fa-twitter"></i>
            </a>
            <a className="btn btn-social-icon" href="http://youtube.com/">
              <i className="fa fa-youtube"></i>
            </a>
            <a className="btn btn-social-icon" href="mailto:">
              <i className="fa fa-envelope-o"></i>
            </a>
          </div>
        </div>
        {/* Footer's menu item */}
        <div className="footer-menu">
          <ul className="list-unstyled">
            <li>
              <Link to="/nhanvien">Nhân viên</Link>
            </li>
            <li>
              <Link to="/phongban">Phòng ban</Link>
            </li>
            <li>
              <Link to="/luong">Bảng lương</Link>
            </li>
          </ul>
        </div>
        <hr />
      </div>
      <div className="justify-content-center">
        <div className="footer-bottom">
          <p>
            Design by - <span>Honie Craft</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
