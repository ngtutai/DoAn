import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function SliderList() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  // Read (Đọc dữ liệu) CRUD
  const fetchSliders = () => {
    fetch("http://localhost:3002/sliders")
      .then((res) => res.json())
      .then((data) => setSliders(data))
      .catch(() => toast.error("Lỗi tải Slider"));
  };

  // Delete (Xóa dữ liệu) CRUD
  const deleteSlider = (id: number) => {
    if (!window.confirm("Bạn có muốn xóa Slider này?")) return;
    fetch(`http://localhost:3002/sliders/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Đã xóa slider!");
        fetchSliders();
      })
      .catch(() => toast.error("Lỗi xóa Slider"));
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <div className="container-fluid bg-light text-start min-vh-100">
      <AdminHeader />
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
          {/* Phần thông tin cần làm */}
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="text-secondary">Slider</h3>
              <Link to="/admin/slider/new" className="btn btn-primary">
                <i className="fa fa-plus me-2"></i> Thêm slider
              </Link>
            </div>

            <table className="table table-bordered text-center">
              <thead className="table-warning">
                <tr>
                  <th style={{ width: "5%" }}>ID</th>
                  <th style={{ width: "10%" }}>Ảnh</th>
                  <th style={{ width: "15%" }}>Tiêu đề</th>
                  <th>Mô tả</th>
                  <th style={{ width: "15%" }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sliders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={`/assets/images/slider/${item.image}`}
                        alt=""
                        style={{ width: 100, height: 60, objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex flex-column flex-md-row gap-2 justify-content-center align-items-center">
                        <Link to={`/admin/slider/edit/${item.id}`}>
                          <button className="btn btn-info w-md-auto">
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger w-md-auto"
                          onClick={() => deleteSlider(item.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
