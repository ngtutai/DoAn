import React, { Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

// Lưu lượng truy cập trang web
const websiteTraffic = [
  { name: "Thứ 2", visits: 600 },
  { name: "Thứ 3", visits: 1050 },
  { name: "Thứ 4", visits: 400 },
  { name: "Thứ 5", visits: 800 },
  { name: "Thứ 6", visits: 450 },
  { name: "Thứ 7", visits: 850 },
  { name: "Chủ Nhật", visits: 750 },
];
// Nguồn doanh thu
const revenueSources = [
  { name: "Online", value: 200 },
  { name: "In-Store", value: 150 },
  { name: "Partners", value: 150 },
];
// Hiệu suất doanh số
const salesPerformance = [
  { name: "Tháng 1", sales: 2000 },
  { name: "Tháng 2", sales: 1500 },
  { name: "Tháng 3", sales: 1000 },
  { name: "Tháng 4", sales: 1390 },
  { name: "Tháng 5", sales: 945 },
  { name: "Tháng 6", sales: 1195 },
  { name: "Tháng 7", sales: 1745 },
  { name: "Tháng 8", sales: 2250 },
  { name: "Tháng 9", sales: 1120 },
  { name: "Tháng 10", sales: 1357 },
  { name: "Tháng 11", sales: 2468 },
  { name: "Tháng 12", sales: 3500 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  return (
    <Fragment>
      <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
        <AdminHeader />
        <div className="row g-0 flex-grow-1">
          <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
            <AdminSidebar />
          </div>

          <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
            {/* Phần thông tin cần làm */}
            <main className="col-12 col-md-12 min-vh-100">
              {/* Stats cards */}
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

              {/* Charts */}
              <div className="row px-4 mt-4">
                {/* Lưu lượng truy cập trang web (Biểu đồ đường) */}
                <div className="col-12 col-lg-8 pe-lg-3 mb-4 mb-lg-0">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        Lưu lượng truy cập trang web
                      </h5>
                      <div style={{ height: "300px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={websiteTraffic}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="visits"
                              stroke="#8884d8"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nguồn doanh thu (Biểu đồ tròn) */}
                <div className="col-12 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="card-title">Nguồn doanh thu</h5>
                      <div style={{ height: "300px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={revenueSources}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={120}
                              label
                            >
                              {revenueSources.map((_, index) => (
                                <Cell
                                  key={index}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hiệu suất doanh số (Biểu đồ cột) */}
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
                            Tháng này
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
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
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
