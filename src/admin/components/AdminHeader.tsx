import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  // thay đổi tên Page Title
  const location = useLocation();
  const getPageTitle = () => {
    if (location.pathname.includes("/admin/dashboard"))
      return "Bảng điều khiển";
    if (location.pathname.includes("/admin/category")) return "Thể loại";
    if (location.pathname.includes("/admin/product")) return "Sản phẩm";
    if (location.pathname.includes("/admin/slider")) return "Slider";
    if (location.pathname.includes("/admin/profileadmin")) return "Thông tin";
    if (location.pathname.includes("/admin/comment")) return "Bình luận";
    // Thêm các route khác nếu cần
    return "Quản trị";
  };

  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("adminToken");
    if (admin) {
      try {
        const parsed = JSON.parse(admin);
        if (parsed?.displayname) {
          setAdminName(parsed.displayname);
        }
      } catch (err) {
        console.error("Lỗi parse adminToken", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Xoá token
    navigate("/admin"); // Quay về trang login
  };

  return (
    <header className="container-fluid bg-light">
      <div className="row align-items-center bg-info bg-opacity-10">
        {/* Chữ &Logo - chiếm 2 cột */}
        <div className="col-12 col-md-2">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <h2 className="mb-0 me-2">ADMIN</h2>
            <img
              src="/assets/images/icons/logo.png"
              alt="Logo"
              style={{ width: "40%", maxWidth: "150px" }}
            />
          </div>
        </div>

        {/* Phần còn lại - chiếm 10 cột */}
        <div className="col-md-10 col-12 bg-gradient-header d-flex flex-wrap align-items-center p-3">
          <button
            className="btn btn-outline-secondary d-md-none me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            <i className="fa fa-bars"></i>
          </button>

          <h4 className="mb-0 me-auto">{getPageTitle()}</h4>

          <form
            className="flex-grow-1 mx-3 position-relative"
            style={{ maxWidth: "300px" }}
          >
            <input
              type="search"
              className="form-control ps-5 rounded-pill border-0 shadow-sm"
              placeholder="Search ..."
              aria-label="Search"
              style={{ height: "40px" }}
            />
            <span className="position-absolute start-0 top-50 translate-middle-y ms-3">
              <i className="fas fa-search text-muted"></i>
            </span>
          </form>

          {/* Avatar + dropdown */}
          <div className="d-flex align-items-center dropdown">
            <span
              className="nav-link dropdown-toggle d-flex align-items-center"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <img
                src="/assets/images/Meo/cat.png"
                alt="Avatar"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span className="me-3">{adminName}</span>
            </span>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <NavLink
                  className="dropdown-item fw-bold text-muted"
                  to="/admin/profileadmin"
                >
                  <i className="fa-solid fa-id-card me-2"></i>
                  Thông tin Admin
                </NavLink>
              </li>
              <li>
                <button
                  className="dropdown-item fw-bold text-muted"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
