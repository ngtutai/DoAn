import React, { Fragment } from "react";
// import "./auths/Admin.css";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

export default function Dashboard() {
  return (
    <Fragment>
      <div className="container-fluid bg-light text-start min-vh-100">
        <AdminHeader />
        <div className="row g-0">
          <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
            <AdminSidebar />
          </div>

          <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
            {/* Main content */}
            <main className="col-12 col-md-12 min-vh-100">
              {/* Stats cards section */}
              <div className="bg-gradient-header1 p-4">
                <div className="row gy-3">
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card bg-white p-3 h-100 border-0 shadow-sm">
                      <h6 className="text-muted">TRUY CẬP</h6>
                      <h4 className="fw-bold">350,897</h4>
                      <small className="text-success">
                        <i className="fa fa-arrow-up me-1"></i>
                        <strong>3,48%</strong> từ tháng trước
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card bg-white p-3 h-100 border-0 shadow-sm">
                      <h6 className="text-muted">NGƯỜI DÙNG MỚI</h6>
                      <h4 className="fw-bold">2,356</h4>
                      <small className="text-danger">
                        <i className="fa fa-arrow-down me-1"></i>
                        <strong>3,48%</strong> từ tuần trước
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card bg-white p-3 h-100 border-0 shadow-sm">
                      <h6 className="text-muted">DOANH SỐ</h6>
                      <h4 className="fw-bold">924</h4>
                      <small className="text-danger">
                        <i className="fa fa-arrow-down me-1"></i>
                        <strong>1,10%</strong> từ hôm qua
                      </small>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card bg-white p-3 h-100 border-0 shadow-sm">
                      <h6 className="text-muted">HIỆU SUẤT</h6>
                      <h4 className="fw-bold">49.65%</h4>
                      <small className="text-success">
                        <i className="fa fa-arrow-up me-1"></i>
                        <strong>12%</strong> từ tháng trước
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main charts section */}
              <div className="row px-4 mt-4">
                {/* Left chart */}
                <div className="col-12 col-lg-8 pe-lg-3 mb-4 mb-lg-0">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        Lưu lượng truy cập trang web
                      </h5>
                      <div
                        className="chart-container"
                        style={{ height: "300px" }}
                      >
                        {/* Placeholder for chart - you would integrate a real chart library here */}
                        <div className="d-flex justify-content-center align-items-center h-100 bg-light rounded">
                          <p className="text-muted">
                            Biểu đồ đường hiển thị dữ liệu lượng truy cập
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right chart */}
                <div className="col-12 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Nguồn doanh thu</h5>
                      <div
                        className="chart-container"
                        style={{ height: "300px" }}
                      >
                        {/* Placeholder for chart */}
                        <div className="d-flex justify-content-center align-items-center h-100 bg-light rounded">
                          <p className="text-muted">
                            Biểu đồ hình tròn hiển thị các nguồn doanh thu
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom chart section */}
              <div className="row px-4 mt-4 mb-4">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title mb-0">Hiệu suất doanh số</h5>
                        <div className="dropdown">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            This Month
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button className="dropdown-item">Hôm nay</button>
                            </li>
                            <li>
                              <button className="dropdown-item">
                                Tuần này
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item">Năm nay</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div style={{ height: "250px" }}>
                        {/* Placeholder for chart */}
                        <div className="d-flex justify-content-center align-items-center h-100 bg-light rounded">
                          <p className="text-muted">
                            Biểu đồ thanh hiển thị dữ liệu bán hàng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <Menu />
        <AdminFooter />
      </div>
    </Fragment>
  );
}
