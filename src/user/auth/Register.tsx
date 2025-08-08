import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../auth/Input";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "../../services/userService";

const Register = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const formhandleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const displayname = fullNameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";
    const confirm = confirmPasswordRef.current?.value || "";

    if (!displayname || !email || !password || !confirm) {
      toast.warning("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirm) {
      toast.warning("Mật khẩu không khớp.");
      return;
    }

    try {
      const existed = await userService.findByEmail(email);
      if (existed) {
        toast.error("Email đã được đăng ký.");
        return;
      }

      const newUser = {
        displayname,
        email,
        password,
        role: "user",
        phone: "",
        address: "",
      };

      await userService.create(newUser);

      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="border rounded p-4 bg-white">
              <h2 className="mb-3 text-center fw-bold">ĐĂNG KÝ</h2>
              <form className="text-start" onSubmit={formhandleRegister}>
                {/* Display Name */}
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Tên hiển thị
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Input
                      id="registerName"
                      type="text"
                      label=""
                      placeholder="Tên hiển thị ..."
                      required
                      inputRef={fullNameRef}
                      className="border-start-0"
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
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Input
                      id="registerEmail"
                      type="email"
                      label=""
                      placeholder="Email ..."
                      required
                      inputRef={emailRef}
                      className="border-start-0"
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
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Input
                      id="registerPassword"
                      label=""
                      placeholder="Mật khẩu ..."
                      required
                      showTogglePassword
                      inputRef={passwordRef}
                      className="border-start-0"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label
                    htmlFor="registerConfirmPassword"
                    className="form-label"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Input
                      id="registerConfirmPassword"
                      label=""
                      placeholder="Xác nhận mật khẩu ..."
                      required
                      showTogglePassword
                      inputRef={confirmPasswordRef}
                      className="border-start-0"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fa-solid fa-user-plus me-2"></i>Đăng ký
                </button>

                {/* Link to Login */}
                <p className="mt-3 text-start">
                  Bạn đã có tài khoản?{" "}
                  <Link to="/login" className="text-decoration-none ms-2">
                    Đăng nhập tại đây 👈
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Register;
