import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

interface User {
  id: string;
  displayname: string;
  email: string;
  role: string;
}

export default function Account() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;

    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err) => {
        console.error("Lỗi khi xóa người dùng:", err);
      });
  };

  return (
    <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-5 text-center">
          {/* Phần thông tin cần làm */}
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="alert alert-warning">Không có tài khoản nào.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover ">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "10%" }}>ID</th>
                    <th style={{ width: "25%" }}>Tên hiển thị</th>
                    <th>Email</th>
                    <th style={{ width: "20%" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.displayname}</td>
                      <td>{user.email}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center flex-wrap gap-2">
                          <button className="btn btn-sm btn-secondary">
                            <i className="fa-solid fa-ban me-2"></i>
                            Ban
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            <i className="fa-solid fa-trash me-2"></i>
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
