import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
// import "./Layout/Admin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const navigate = useNavigate();

  useEffect(() => {
    // hiện sẵn tk mk admin chỉ cần nhấn đăng nhập
    const remembered = localStorage.getItem("adminRemember");
    if (remembered) {
      const { email, password } = JSON.parse(remembered);
      setEmail(email);
      setPassword(password);
      setRememberMe(true);
    }
    ////////////////////////////////////////////////
    const isLoggedIn = !!localStorage.getItem("adminToken");
    if (isLoggedIn) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Please enter your email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Please enter your password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin hợp lệ.");
      return;
    }

    try {
      const adminUser = await userService.findByAccountdRole(
        email,
        password,
        "admin"
      );

      if (adminUser) {
        toast.success("Bạn đã đăng nhập với vai trò Admin!");
        localStorage.setItem(
          "adminToken",
          JSON.stringify({
            id: adminUser.id,
            displayname: adminUser.displayname,
            email: adminUser.email,
            role: adminUser.role,
          })
        );
        // hiện sẵn tk mk admin chỉ cần nhấn đăng nhập
        if (rememberMe) {
          localStorage.setItem(
            "adminRemember",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("adminRemember");
        }
        ////////////////////////////////////////////////
        navigate("/admin/dashboard");
      } else {
        toast.warning("Sai hoặc là bạn không phải Admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card ms-5">
        <h2 className="mb-5 text-primary">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div
            className={`form-group ${email || isFocused.email ? "filled" : ""}`}
          >
            <div className="input-container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                required
              />
              <label className="floating-label">Email</label>
              <span className="input-icon">
                <i className="fa-solid fa-envelope text-danger"></i>
              </span>
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div
            className={`form-group ${
              password || isFocused.password ? "filled" : ""
            }`}
          >
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                required
              />
              <label className="floating-label">Password</label>
              <span className="input-icon">
                <i className="fa-solid fa-lock text-danger"></i>{" "}
                {/* Icon Password */}
              </span>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>
                  <i
                    className={`fa-solid ${
                      showPassword
                        ? "fa-eye  text-danger"
                        : "fa-eye-slash text-danger" // Xem mật khẩu
                    }`}
                  ></i>
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me (Ghi nhớ đăng nhập) */}
          <div className="checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="text-primary">Ghi nhớ đăng nhập</label>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
