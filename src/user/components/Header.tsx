import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const location = useLocation();
  const dropdownRoutes = ["/profile", "/change-password", "/orders"];
  const isDropdownActive = dropdownRoutes.includes(location.pathname);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedUser = localStorage.getItem("currentUser");
      const userId = storedUser ? JSON.parse(storedUser).id : null;
      const cartKey = userId ? `cart_${userId}` : "cart";
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const count = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      setCartCount(count);
    };

    updateCartCount(); // Lần đầu load
    window.addEventListener("cartUpdated", updateCartCount);
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="header-area header-area2 bg-primary bg-opacity-25 p-0 sticky-top">
      <nav className="navbar navbar-expand-lg navbar-primary">
        <div className="container fw-bold">
          <a className="col-2" href="/">
            <img src="/assets/images/iconlogo/icon-web.png" alt="Logo" />
          </a>

          {/* Nút mở menu mobile (hiện offcanvas) */}
          <button
            className="btn btn-outline-secondary d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <i className="fa fa-bars"></i>
          </button>

          {/* Nav items */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="mobileMenu"
            aria-labelledby="mobileMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="mobileMenuLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body text-start">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-1">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pet"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    Thú cưng
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/service"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    Dịch vụ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    Liên hệ
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <NavLink
                    to="/teampage"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    <img
                      src="/assets/images/iconlogo/group.png"
                      alt="group"
                      className="ms-2"
                      style={{
                        width: "35px", // hoặc 40px tùy kích thước bạn muốn
                        height: "35px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0 mt-1">
                <li className="nav-item me-2">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      "nav-link position-relative" + (isActive ? " active" : "")
                    }
                  >
                    <i className="fa-solid fa-cart-shopping me-1"></i>
                    <span
                      className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger bg-opacity-75"
                      style={{ fontSize: "12px" }}
                    >
                      {cartCount}
                    </span>
                    Giỏ hàng
                  </NavLink>
                </li>
                {!currentUser ? (
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      <i className="fa-solid fa-user"></i> Đăng nhập
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item dropdown ms-2">
                    <span
                      className={
                        "nav-link dropdown-toggle" +
                        (isDropdownActive ? " active " : "")
                      }
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-user me-1"></i>{" "}
                      {currentUser.displayname}
                    </span>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink
                          className="dropdown-item fw-bold text-muted"
                          to="/profile"
                        >
                          <i className="fa-solid fa-id-card me-1"></i>
                          Thông tin tài khoản
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item fw-bold text-muted"
                          to="/change-password"
                        >
                          <i className="fa-solid fa-key me-2"></i>
                          Đổi mật khẩu
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item fw-bold text-muted"
                          to="/orders"
                        >
                          <i className="fa-solid fa-envelope-open-text me-2"></i>
                          Đơn hàng
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item fw-bold text-muted"
                          to="/historyorder"
                        >
                          <i className="fa-solid fa-envelope-open-text me-2"></i>
                          Lịch sử
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
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;
