import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Khi vào trang, kiểm tra nếu đã lưu
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    const rememberedPassword = localStorage.getItem("rememberPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

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

        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
          localStorage.setItem("rememberPassword", password);
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPassword");
        }

        toast.success("Đăng nhập thành công!");
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

                  <div className="form-check mb-3 d-flex align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ cursor: "pointer", transform: "scale(1.2)" }}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="form-check-label text-dark mt-1"
                      style={{ cursor: "pointer", fontSize: "1rem" }}
                    >
                      Ghi nhớ đăng nhập
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    Đăng nhập
                  </button>
                  <p className="mt-3 text-start">
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/register" className="text-decoration-none ms-2">
                      Đăng ký 👈
                    </Link>
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
