<<<<<<< HEAD:src/user/page/Profile.tsx
import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
>>>>>>> ff4f67a (Initial commit):src/components/user/Profile.tsx

export interface User {
  id: number;
  displayname: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const localUser = JSON.parse(storedUser);
      axios
        .get(`http://localhost:3001/users/${localUser.id}`)
        .then((res) => {
          setUser(res.data);
          setFormData(res.data); // Gán dữ liệu vào form
        })
        .catch(() => {
          setUser(localUser);
          setFormData(localUser);
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const response = await axios.put(`http://localhost:3001/users/${formData.id}`, formData);
      
      setUser(response.data);
      setIsEditing(false);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại!");
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
      <div className="container py-2">
        <div className="row">
          <section className="bread-crumb">
            <div className="container">
              <div className="row">
                <div className="col-12 a-left">
                  <ul className="breadcrumb">
                    <li className="home">
                      <a href="/" className="nav-link text-muted">
                        <span>Trang chủ</span>
                      </a>
                    </li>
                    <li>
                      <span className="mr_lr">&nbsp;/&nbsp;</span>
                      <strong>
                        <span>Thông tin tài khoản</span>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Sidebar />

          <div className="col-md-9">
            <h5 className="mt-4">Thông tin tài khoản</h5>
            {!isEditing ? (
              <>
                <table className="table table-bordered text-start mt-3">
                  <tbody>
                    <tr>
                      <th className="col-2" scope="row">
                        Tên hiển thị
                      </th>
                      <td>{user.displayname}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Số điện thoại</th>
                      <td>{user.phone || "Chưa cập nhật"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Địa chỉ</th>
                      <td>{user.address || "Chưa cập nhật"}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa
                </button>
              </>
            ) : (
              <>
                <table className="table table-bordered text-start mt-3">
                  <tbody>
                    <tr>
                      <th scope="row">Tên hiển thị</th>
                      <td>
                        <input
                          type="text"
                          name="displayname"
                          className="form-control"
                          value={formData.displayname}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Số điện thoại</th>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={formData.phone || ""}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Địa chỉ</th>
                      <td>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={formData.address || ""}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-success me-2" onClick={handleSave}>
                  Lưu
                </button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
