import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

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

          {/* Form đổi mật khẩu */}

          <div className="col-md-9">
            <div className="card shadow-sm text-start rounded-3">
              <div className="card-header bg-primary text-white fw-semibold">
                <i className="fa-solid fa-key me-2"></i>Đổi mật khẩu 1
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu cũ</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
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
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu mới</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-key"></i>
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
                  <div className="mb-3">
                    <label className="form-label">Xác nhận mật khẩu mới</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-check-double"></i>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
