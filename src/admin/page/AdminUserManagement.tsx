import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface Users {
  id: number;
  displayname: string;
  email: string;
  role: string;
}

export default function AdminUserManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  const navigate = useNavigate(); // Thêm dòng này

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Không thể tải danh sách người dùng.");
    }
  };

  const deleteUser = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await fetch(`http://localhost:3001/users/${id}`, {
          method: "DELETE",
        });
        toast.success("Đã xóa người dùng.");
        fetchUsers(); // cập nhật lại danh sách
      } catch {
        toast.error("Xóa thất bại.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4">Quản lý người dùng</h3>
      <button onClick={() => navigate(-1)}>Quay trở về</button>

      <table className="table table-bordered table-hover bg-white">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Tên hiển thị</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.displayname}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(u.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
