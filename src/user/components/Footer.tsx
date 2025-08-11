function Footer() {
  return (
    <>
      <footer className="bg-primary bg-opacity-10 mt-2">
        <div className="container-fluid p-0 text-muted">
          <div className="row mx-5">
            {/* Cột 1: Thông tin liên hệ */}
            <div className="col-12 col-md-3 mt-3 text-start">
              <h5 className="fw-bold">Thông tin liên hệ</h5>
              <p style={{ fontSize: "15px" }}>
                <strong>KunPet.vn</strong> là trang mua sắm trực tuyến các sản
                phẩm bán lẻ dành cho thú cưng của{" "}
                <strong>KUN Pet Shop. Công ty TNHH KUN</strong> .Giấy chứng nhận
                Đăng ký Kinh doanh - số: 1900.123.321 - do Sở Kế hoạch và Đầu tư
                Thành phố Hồ Chí Minh cấp ngày 28/03/2019.
              </p>
            </div>

            {/* Cột 2: Thông tin cửa hàng*/}
            <div className="col-12 col-md-3 mt-3 text-start">
              <h5 className="fw-bold">Thông tin cửa hàng</h5>
              <ul className="list-unstyled">
                <li>
                  <i className="fa-solid fa-location-dot me-2"></i>
                  123 Đường ABC, Q.1, TP.HCM
                </li>
                <li>
                  <i className="fa-solid fa-envelope me-2"></i>
                  info@petshop.vn
                </li>
                <li>
                  <i className="fa-solid fa-phone me-2"></i>
                  1900 123 321
                </li>
              </ul>
            </div>

            {/* Cột 3: Hỗ trợ khách hàng */}
            <div className="col-12 col-md-3 mt-3 text-start fw-bold">
              <h5 className="fw-bold">Hỗ trợ khách hàng</h5>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Tìm kiếm
                </a>
              </li>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="/" className="text-dark text-decoration-none">
                  Chính sách đổi trả
                </a>
              </li>
            </div>

            {/* Cột 4:  Chăm sóc khách hàng */}
            <div className="col-12 col-md-3 mt-3 text-start">
              <h5 className="fw-bold d-flex justify-content-between align-items-center">
                Chăm sóc khách hàng
              </h5>
              <div className="row">
                <div className="col-2 fs-3">
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className="col-9">
                  <span>1900 123 321</span>
                  <div>
                    <a href="/" className="text-muted fw-bold">
                      <u>info@petshop.vn</u>
                    </a>
                  </div>
                </div>
                <h4 className="mt-3">Follow Us</h4>
                <div className="col-12 mt-2">
                  <button className="btn btn-outline-dark me-2 mb-2">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                  <button className="btn btn-outline-dark me-2 mb-2">
                    <i className="fa-brands fa-instagram"></i>
                  </button>
                  <button className="btn btn-outline-dark me-2 mb-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </button>
                  <button className="btn btn-outline-dark me-2 mb-2">
                    <i className="fa-brands fa-twitter"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copy bg-secondary bg-opacity-10 py-2 text-muted">
          Website design By Bee <i>@Nocopyright</i>
        </div>
      </footer>
    </>
  );
}
export default Footer;
