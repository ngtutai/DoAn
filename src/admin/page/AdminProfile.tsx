import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";
import { toast } from 'react-toastify';

export interface Admin {
  id: string;
  displayname: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function AdminProfile() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<Admin | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAdmin(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (formData && admin) {
      try {
        const response = await fetch(`http://localhost:3001/users/${admin.id}`, {
          method: "PATCH", // hoặc PUT nếu bạn muốn ghi đè toàn bộ
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Lỗi khi cập nhật người dùng");

        localStorage.setItem("currentUser", JSON.stringify(formData));
        setAdmin(formData);
        setEditing(false);
        toast.success("Cập nhật thông tin thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Cập nhật thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (!admin || !formData) {
    return (
      <div className="container py-5">
        <h3 className="text-danger">Không tìm thấy thông tin quản trị viên.</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>

        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-4">
          <main className="col-12 bg-white rounded shadow-sm p-4">
            <h4 className="fw-bold mb-4">
              <i className="fa fa-user me-2 text-primary" />
              Thông tin quản trị viên
            </h4>

            <div className="mb-3">
              <label className="form-label fw-bold">Tên hiển thị</label>
              <input
                type="text"
                className="form-control"
                name="displayname"
                value={formData.displayname}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="text-end">
              {editing ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    <i className="fa fa-save me-1"></i> Lưu thay đổi
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditing(false)}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditing(true)}
                >
                  <i className="fa fa-edit me-1"></i> Chỉnh sửa
                </button>
              )}
            </div>
          </main>
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
