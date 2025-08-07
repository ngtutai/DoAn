// services/orderService.ts
import api from "./api";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  code: string;
  userId: number;
  orderDate: string;
  status: "delivered" | "cancel";
  shippingFee: number;
  total: number;
  items: OrderItem[];
}

// Lấy danh sách tất cả đơn hàng
const list = () => api.get<Order[]>(api.url.orders).then((res) => res.data);
// Lấy chi tiết đơn hàng theo ID
const get = (id: number) =>
  api.get<Order>(`${api.url.orders}/${id}`).then((res) => res.data);
// Tạo đơn hàng mới
const create = (order: Omit<Order, "id">) =>
  api.post<Order>(api.url.orders, order).then((res) => res.data);
// Cập nhật đơn hàng theo ID
const update = (id: number, order: Partial<Order>) =>
  api.put<Order>(`${api.url.orders}/${id}`, order).then((res) => res.data);
// Xóa đơn hàng theo ID
const remove = (id: number) =>
  api.delete(`${api.url.orders}/${id}`).then((res) => res.data);

const orderService = {
  list,
  get,
  create,
  update,
  remove,
};

export default orderService;
