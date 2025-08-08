import axios from "axios";

const url = {
  baseUrl: "http://localhost:3001", // trỏ đến JSON Server
  sliders: "/sliders",
  users: "/users",
  categories: "/categories",
  pets: "/pets",
  orders: "/orders",
  vouchers: "/vouchers",
  comments: "/comments",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const api = {
  url,
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default api;
