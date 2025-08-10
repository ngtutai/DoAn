// services/userService.ts
import api from "./api";

export interface User {
  id: string;
  displayname: string;
  email: string;
  password?: string;
  role: string;
}

// Lấy danh sách người dùng
const list = () => api.get<User[]>(api.url.users).then((res) => res.data);

// Thêm user mới
const create = (user: Partial<User>) =>
  api.post(api.url.users, user).then((res) => res.data);

// Lấy người dùng theo email + password (dành cho login giả lập)
const findByEmailPassword = async (email: string, password: string) => {
  const res = await api.get<User[]>(
    `${api.url.users}?email=${email}&password=${password}`
  );
  return res.data[0]; // chỉ lấy 1 người đầu tiên
};

// Tìm user theo email
const findByEmail = async (email: string) => {
  const res = await api.get<User[]>(`${api.url.users}?email=${email}`);
  return res.data[0]; // lấy user đầu tiên nếu có
};

const findByAccountdRole = async (
  email: string,
  password: string,
  role: string
) => {
  const res = await api.get<User[]>(
    `${api.url.users}?email=${email}&password=${password}&role=${role}`
  );
  return res.data[0];
};

// Xóa người dùng theo ID
const remove = (id: string) =>
  api.delete(`${api.url.users}/${id}`).then((res) => res.data);

const update = (id: string, data: Partial<User>) =>
  api.patch(`${api.url.users}/${id}}`, data).then((res) => res.data);

const getById = (id: string) =>
  api.get<User>(`${api.url.users}/${id}`).then((res) => res.data);

const userService = {
  list,
  create,
  findByEmailPassword,
  findByEmail,
  findByAccountdRole,
  remove,
  update,
  getById, // thêm vào đây
};
export default userService;
