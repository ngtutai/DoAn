import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userService from "../../services/userService";

export interface Admin {
  id: string;
  displayname: string;
  role: string;
  email: string;
  phone?: string;
  address?: string;
}

function AdminProfile() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<Admin | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      const parsed = JSON.parse(stored);
      userService.getById(parsed.id).then((fresh) => {
        setAdmin(fresh);
        setFormData(fresh);
      });
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
        await userService.update(admin.id, formData);

        localStorage.setItem("adminToken", JSON.stringify(formData));
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
    <>
      <div className="container p-3">
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
              placeholder="Nhập tên hiển thị"
              title="Tên hiển thị"
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
              placeholder="Nhập email"
              title="Email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Nhập số điện thoại"
              title="Số điện thoại"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="text-end">
            {editing ? (
              <>
                <button
                  className="btn btn-outline-info me-2"
                  onClick={handleSave}
                >
                  <i className="fa fa-save me-1"></i> Lưu
                </button>
                <button
                  className="btn btn-outline-success"
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
    </>
  );
}
export default AdminProfile;
