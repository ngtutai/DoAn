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
const list = async () => {
  const res = await api.get<Order[]>(api.url.orders);
  return res.data;
};

// Lấy chi tiết đơn hàng theo ID
const get = async (id: number) => {
  const res = await api.get<Order>(`${api.url.orders}/${id}`);
  return res.data;
};

const create = async (data: Order) => {
  const res = await api.post(api.url.orders, data);
  return res.data;
};

const update = async (id: number, order: Partial<Order>) => {
  const res = await api.put<Order>(`${api.url.orders}/${id}`, order);
  return res.data;
};

const remove = async (id: number) => {
  const res = await api.delete(`${api.url.orders}/${id}`);
  return res.data;
};

const orderService = {
  list,
  get,
  create,
  update,
  remove,
};

export default orderService;
