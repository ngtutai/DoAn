import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary bg-opacity-50 text-dark">
          <h6 className="mb-0 mt-1">Tài khoản</h6>
        </div>
        <div className="list-group list-group-flush text-start">
          <a
            href="/profile"
            className={`list-group-item list-group-item-action ${
              isActive("/profile") ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-id-card me-2"></i> Thông tin tài khoản
          </a>
          <a
            href="/change-password"
            className={`list-group-item list-group-item-action ${
              isActive("/change-password") ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-key me-2"></i> Đổi mật khẩu
          </a>
          <a
            href="/orders"
            className={`list-group-item list-group-item-action ${
              isActive("/orders") ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-envelope-open-text me-2"></i> Đơn hàng
          </a>
          <a
            href="/historyorder"
            className={`list-group-item list-group-item-action mb-5 ${
              isActive("/historyorder") ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-envelope-open-text me-2"></i> Lịch sử
          </a>
          <span className="pt-5 mt-5 mb-5"></span>
        </div>
      </div>
    </div>
  );
}
