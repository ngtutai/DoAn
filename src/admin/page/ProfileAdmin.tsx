import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

export default function ProfileAdmin() {
  return (
    <div className="container-fluid bg-light text-start min-vh-100">
      <AdminHeader />
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-4">
          {/* Phần thông tin cần làm */}
          <main className="col-12 col-md-12 min-vh-100 bg-light rounded"></main>
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
