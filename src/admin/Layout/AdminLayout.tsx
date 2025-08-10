import { Outlet } from "react-router-dom";
import "./Admin.css"; // ⬅️ đúng và đầy đủ
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminMenu from "../components/AdminMenu";
import AdminFooter from "../components/AdminFooter";

function AdminLayout() {
  return (
    <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
          {/* Có thể thêm sidebar, header,... */}
          <Outlet />
        </div>
      </div>
      <AdminMenu />
      <AdminFooter />
    </div>
  );
}

export default AdminLayout;
