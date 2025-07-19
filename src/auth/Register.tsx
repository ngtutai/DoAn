import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  // Coi mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Đăng ký
  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.warning("Mật khẩu không khớp.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const existed = users.find((u: any) => u.email === email);
      if (existed) {
        toast.error("Email đã được đăng ký.");
        return;
      }

      const newUser = {
        displayname,
        email,
        password,
        role: "user",
        image: "",
      };

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div
              className="tab-pane fade show active border rounded p-4 bg-white"
              id="register"
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <h2 className="mb-3 text-center fw-bold">ĐĂNG KÝ</h2>
              <form className="text-start" onSubmit={handleRegister}>
                {/* Tên hiển thị (Display Name) */}
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Tên hiển thị
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
                      placeholder="Tên hiển thị ..."
                      required
                      value={displayname}
                      onChange={(e) => setDisplayname(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="Email ..."
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mật khẩu (Password) */}
                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="registerPassword"
                      placeholder="Mật khẩu ..."
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`fa-solid ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                {/* Xác nhận mật khẩu (Confirm Password) */}
                <div className="mb-3">
                  <label
                    htmlFor="registerConfirmPassword"
                    className="form-label"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showConfirm ? "text" : "password"}
                      className="form-control"
                      id="registerConfirmPassword"
                      placeholder="Xác nhận mật khẩu ..."
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <span
                      className="input-group-text"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`fa-solid ${
                          showConfirm ? "fa-eye" : "fa-eye-slash"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                {/* Nút Đăng ký */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fa-solid fa-user-plus me-2"></i> Đăng ký
                </button>

                <p className="mt-3 text-start">
                  Bạn đã có tài khoản?{" "}
                  <a href="/login" className="text-decoration-none ms-2">
                    Đăng nhập tại đây 👈
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
