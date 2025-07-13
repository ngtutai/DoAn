import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const found = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        toast.success("Đăng nhập thành công!");

        // if (found.role === "admin") navigate("/admin/dashboard"); // admin luôn vào trang admin
        // else navigate("/"); // user luôn vào trang chủ
        navigate("/"); // luôn vào trang chủ
      } else {
        toast.warning("Email hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="form-check form switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
        />
        <label
          className="form-check-label"
          htmlFor="flexSwitchCheckDefault"
        ></label>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="tab-content" id="authTabsContent">
              {/* Login Form */}
              <div
                className="tab-pane fade show active border rounded p-4 bg-white"
                id="login"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <h2 className="mb-3 text-center fw-bold">ĐĂNG NHẬP</h2>
                <form className="text-start" onSubmit={handleLogin}>
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
                        id="loginEmail"
                        placeholder="Email ..."
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password */}
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
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="alert alert-danger py-2">{errorMsg}</div>
                  )}

                  <button type="submit" className="btn btn-primary w-100">
                    Đăng nhập
                  </button>
                  <p className="mt-3 text-start">
                    Bạn chưa có tài khoản?{" "}
                    <a href="/register" className="text-decoration-none ms-2">
                      Đăng ký 👈
                    </a>
                  </p>
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
