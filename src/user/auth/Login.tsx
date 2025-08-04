import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "./Input"; // Import component Input
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    const rememberedPassword = localStorage.getItem("rememberPassword");

    if (emailRef.current && rememberedEmail)
      emailRef.current.value = rememberedEmail;
    if (passwordRef.current && rememberedPassword)
      passwordRef.current.value = rememberedPassword;
    if (rememberedEmail && rememberedPassword) setRememberMe(true);
  }, []);

  const formhandleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      setErrorMsg("Vui lòng nhập đầy đủ thông tin");
      return;
    }

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
        navigate("/");
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
              <div
                className="tab-pane fade show active border rounded p-4 bg-white"
                id="login"
                role="tabpanel"
              >
                <h2 className="mb-3 text-center fw-bold">ĐĂNG NHẬP</h2>
                <form className="text-start" onSubmit={formhandleLogin}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <Input
                        id="loginEmail"
                        inputRef={emailRef}
                        type="email"
                        placeholder="Email ..."
                        required
                        label=""
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Mật khẩu
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <Input
                        id="loginPassword"
                        inputRef={passwordRef}
                        placeholder="Mật khẩu ..."
                        required
                        label=""
                        showTogglePassword
                      />
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
};
export default Login;
