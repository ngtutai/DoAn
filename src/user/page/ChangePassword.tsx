import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.warning("Bạn chưa đăng nhập.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (currentPassword !== user.password) {
      toast.error("Mật khẩu hiện tại không đúng.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3001/users/${user.id}`, {
        ...user,
        password: newPassword,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!");
      console.error(error);
    }
  };

  return (
    <Fragment>
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
                        <span>Đổi mật khẩu</span>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Sidebar />

          {/* Form đổi mật khẩu */}
          <div className="col-md-9 d-flex justify-content-center bg-light">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <h3 className="mb-4 mt-4 text-center">Đổi mật khẩu</h3>
              <form onSubmit={handleChangePassword}>
                {/* Mật khẩu hiện tại */}
                <div className="form-group text-center">
                  <label>Mật khẩu hiện tại</label>
                  <div className="input-group">
                    <input
                      type={showCurrent ? "text" : "password"}
                      className="form-control text-center"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowCurrent(!showCurrent)}
                      >
                        <i
                          className={`fa-solid ${
                            showCurrent ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mật khẩu mới */}
                <div className="form-group text-center">
                  <label>Mật khẩu mới</label>
                  <div className="input-group">
                    <input
                      type={showNew ? "text" : "password"}
                      className="form-control text-center"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowNew(!showNew)}
                      >
                        <i
                          className={`fa-solid ${
                            showNew ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="form-group text-center">
                  <label>Xác nhận mật khẩu mới</label>
                  <div className="input-group">
                    <input
                      type={showConfirm ? "text" : "password"}
                      className="form-control text-center"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        <i
                          className={`fa-solid ${
                            showConfirm ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3 w-100"
                >
                  Cập nhật mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
