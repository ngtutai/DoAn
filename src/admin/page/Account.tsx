import React, { useState, useEffect } from "react";
import userService, { User } from "../../services/userService";

function Account() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .list()
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

    userService
      .remove(id)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err) => {
        console.error("Lỗi khi xóa người dùng:", err);
      });
  };

  return (
    <>
      {/* Phần thông tin cần làm */}
      <div className="container p-4">
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
                        <button className="btn btn-sm btn-outline-warning">
                          <i className="fa-solid fa-ban me-2"></i>
                          Ban
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
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
    </>
  );
}
export default Account;
