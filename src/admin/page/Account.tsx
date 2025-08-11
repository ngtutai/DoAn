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

  const handleToggleBan = (id: string, disabled: boolean) => {
    userService
      .update(id, { disabled: !disabled })
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, disabled: !disabled } : u))
        );
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật trạng thái:", err);
      });
  };

  return (
    <div className="container p-4">
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : users.length === 0 ? (
        <div className="alert alert-warning">Không có tài khoản nào.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: "25%" }}>Tên hiển thị</th>
                <th style={{ width: "25%" }}>Email</th>
                <th style={{ width: "25%" }}>Trạng thái</th>
                <th style={{ width: "20%" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.displayname}</td>
                  <td>{user.email}</td>
                  <td>{user.disabled ? "Vô hiệu hóa" : "Hoạt động"}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                      <button
                        className={`btn btn-sm ${
                          user.disabled
                            ? "btn-outline-success"
                            : "btn-outline-warning"
                        }`}
                        onClick={() =>
                          handleToggleBan(user.id, user.disabled ?? false)
                        }
                      >
                        <i
                          className={`fa-solid ${
                            user.disabled ? "fa-unlock" : "fa-ban"
                          } me-2`}
                        ></i>
                        {user.disabled ? "open" : "lock"}
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
  );
}
export default Account;
