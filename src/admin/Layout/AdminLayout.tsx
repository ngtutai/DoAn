import { Outlet } from "react-router-dom";
import "./Admin.css"; // ⬅️ đúng và đầy đủ

function AdminLayout() {
  return (
    <div>
      {/* Có thể thêm sidebar, header,... */}
      <Outlet />
    </div>
  );
}

export default AdminLayout;
