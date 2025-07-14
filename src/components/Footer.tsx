export default function Footer() {
  return (
    <footer className="mt-3 bg-primary bg-opacity-10">
      <div className="container py-4">
        <div className="row mx-auto">
          {/* Cột 1: Logo và mô tả */}
          <div className="col-12 col-md-3 mb-2 text-center">
            <div className="row">
              <div className="col mt-4">
                <h3 className="fw-bold">
                  PET
                  <br />
                  SHOP
                </h3>
              </div>
              <div className="col text-start">
                <img
                  src="/assets/images/iconlogo/icon-web.png"
                  alt="Logo"
                  className="rounded-circle my-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
            </div>
            <p className="mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>

          {/* Cột 2: Category One */}
          <div className="col-6 col-md-2 mb-2">
            <h6 className="fw-bold">Category one</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category one - 1
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category one - 2
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category one - 3
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category one - 4
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Category Two */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold">Category two</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category two - 1
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category two - 2
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category two - 3
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category two - 4
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Category Three */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold">Category Three</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category Three - 1
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category Three - 2
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category Three - 3
                </a>
              </li>
              <li>
                <a href="/" className="text-danger text-decoration-none">
                  Category Three - 4
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 5: Category Four */}
          <div className="col-6 col-md-3">
            <h6 className="fw-bold">Liên hệ</h6>
            <ul className="list-unstyled text-start text-danger mb-3">
              <li>
                <i className="fa-solid fa-location-dot me-2"></i>
                123 Đường ABC, Q.1, TP.HCM
              </li>
              <li>
                <i className="fa-solid fa-phone me-2"></i>
                1900 123 456
              </li>
              <li>
                <i className="fa-solid fa-envelope me-2"></i>
                lienhe@petshop.vn
              </li>
            </ul>

            <form>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Nhập email của bạn ..."
                  required
                />
                <button className="btn btn-danger rounded" type="submit">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-copy bg-secondary bg-opacity-25 py-2">
        Website design By Bee <i>@Nocopyright</i>
      </div>
    </footer>
  );
}
