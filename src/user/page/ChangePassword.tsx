import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
<<<<<<< HEAD
import axios from "axios";
import { toast } from "react-toastify";
=======
>>>>>>> 61f9362cb7377452b379035cd35910194e77cf4a

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Mật khẩu mới và xác nhận không khớp.");
      return;
    }

    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      if (!currentUser?.id) {
        setMessage("❌ Không tìm thấy người dùng hiện tại.");
        return;
      }

      const res = await fetch(`http://localhost:3001/users/${currentUser.id}`);
      const user = await res.json();

      if (user.password !== oldPassword) {
        setMessage("❌ Mật khẩu cũ không chính xác.");
        return;
      }

      await fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      setMessage("✅ Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  return (
    <Fragment>
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
                  <strong>Đổi mật khẩu</strong>
                </li>
              </ul>
            </div>
          </section>

          <Sidebar />

<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
          <div className="col-md-9">
            <div className="card shadow-sm rounded-3">
              <div className="card-header bg-primary text-white fw-semibold">
                <i className="fa-solid fa-key me-2"></i>Đổi mật khẩu
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu cũ</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
<<<<<<< HEAD
=======
>>>>>>> 61f9362cb7377452b379035cd35910194e77cf4a
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu mới</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-key"></i>
<<<<<<< HEAD
=======
>>>>>>> 61f9362cb7377452b379035cd35910194e77cf4a
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                  <div className="mb-3">
                    <label className="form-label">Xác nhận mật khẩu mới</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-check-double"></i>
<<<<<<< HEAD
=======
>>>>>>> 61f9362cb7377452b379035cd35910194e77cf4a
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3 w-100"
                >
                  Cập nhật mật khẩu
                </button>
              </form>
=======
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
                  {message && (
                    <div
                      className={`alert ${
                        message.includes("✅")
                          ? "alert-success"
                          : "alert-danger"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                      <i className="fa-solid fa-save me-2"></i> Cập nhật mật
                      khẩu
                    </button>
                  </div>
                </form>
              </div>
<<<<<<< HEAD
=======
>>>>>>> 61f9362cb7377452b379035cd35910194e77cf4a
>>>>>>> 35fa856093cc888ce21452039d0c62b0993fbf8b
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
