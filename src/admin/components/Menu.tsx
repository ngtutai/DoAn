import React, { Fragment } from "react";
import AdminSidebar from "./AdminSidebar";

export default function Menu() {
  return (
    <Fragment>
      {/* Sidebar offcanvas(menu ẩn) cho mobile */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 id="mobileSidebarLabel" className="mb-0">
            Thanh điều hướng
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <AdminSidebar />
        </div>
      </div>
    </Fragment>
  );
}
