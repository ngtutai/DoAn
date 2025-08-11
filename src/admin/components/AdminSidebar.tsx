import { NavLink } from "react-router-dom";
import React, { Fragment } from "react";

function AdminSidebar() {
  return (
    <Fragment>
      <nav className="sidebar border-end">
        <ul className="nav flex-column list-unstyled mt-3">
          {/* Dashboard (Bảng điều khiển) */}
          <li className="nav-item">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-gauge me-2"></i> Bảng điều khiển
            </NavLink>
          </li>

          {/* Order (Đơn hàng) */}
          <li className="nav-item">
            <NavLink
              to="/admin/order"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-envelope-open-text me-2"></i> Đơn hàng
            </NavLink>
          </li>

          {/* Product (Sản phẩm) */}
          <li className="nav-item">
            <NavLink
              to="/admin/product"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-brands fa-product-hunt me-2"></i> Sản phẩm
            </NavLink>
          </li>

          {/* Slide */}
          <li className="nav-item">
            <NavLink
              to="/admin/slider"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-sliders me-2"></i> Slider
            </NavLink>
          </li>

          {/* History (Lịch sử) */}
          <li className="nav-item">
            <NavLink
              to="/admin/history"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-file-lines me-2"></i> Lịch sử
            </NavLink>
          </li>

          {/* Account (Tài khoản) */}
          <li className="nav-item">
            <NavLink
              to="/admin/account"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-user-tie me-2"></i> Tài khoản
            </NavLink>
          </li>

          {/* Account (Mã giảm giá) */}
          <li className="nav-item">
            <NavLink
              to="/admin/voucher"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-tag me-2"></i> Mã giảm giá
            </NavLink>
          </li>

          {/* Comment (Bình luận ) */}
          <li className="nav-item">
            <NavLink
              to="/admin/comment"
              className={({ isActive }) =>
                "nav-link fw-semibold" + (isActive ? " active " : "")
              }
            >
              <i className="fa-solid fa-comment me-2"></i> Bình luận
            </NavLink>
          </li>

          <hr />

          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/assets/images/iconlogo/icon-web.png"
              alt=""
              style={{ width: "50%" }}
            />
            <img
              src="/assets/images/iconlogo/icon-map.png"
              alt=""
              style={{ width: "50%" }}
            />
          </div>
        </ul>
      </nav>
    </Fragment>
  );
}
export default AdminSidebar;
