import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface User {
  id: number;
  displayname: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => { //cap nhat thong tin nguoi dung
    if (formData && user) {
      try {
        const response = await fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Lỗi khi cập nhật người dùng");

        localStorage.setItem("currentUser", JSON.stringify(formData));
        setUser(formData);
        setEditing(false);
        toast.success("Cập nhật thông tin thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Cập nhật thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (!user || !formData) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <h3 className="text-danger">Bạn chưa đăng nhập!</h3>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-3">
        <div className="row">
          <section className="bread-crumb mb-3">
            <div className="col-12">
              <ul className="breadcrumb">
                <li className="home">
                  <a href="/" className="text-muted text-decoration-none">
                    <i className="fa fa-home me-1"></i>Trang chủ
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                  <strong>Thông tin tài khoản</strong>
                </li>
              </ul>
            </div>
          </section>
          <Sidebar />
          <div className="col-md-9">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white fw-bold">
                <i className="fa fa-user me-2"></i>Thông tin tài khoản
              </div>
              <div className="card-body">
                <div className="mb-3 d-flex align-items-center">
                  <i className="fa fa-id-badge me-2"></i>
                  <input
                    type="text"
                    name="displayname"
                    className="form-control"
                    placeholder="Tên hiển thị"
                    value={formData.displayname}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <i className="fa fa-envelope me-2"></i>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <i className="fa fa-phone me-2"></i>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <i className="fa fa-map-marker-alt me-2"></i>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={formData.address || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
                <div className="text-end">
                  {editing ? (
                    <>
                      <button className="btn btn-success me-2" onClick={handleSave}>
                        <i className="fa fa-save me-1"></i>Lưu thay đổi
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                        Hủy
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => setEditing(true)}>
                      <i className="fa fa-edit me-1"></i>Chỉnh sửa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
