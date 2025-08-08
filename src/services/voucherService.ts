// services/voucherService.ts
import api from "./api";

export interface Vouchers {
  id: number;
  code: string;
  percent: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
}

const list = async () => {
  const res = await api.get<Vouchers[]>(api.url.vouchers);
  return res.data;
};

const add = async (data: Omit<Vouchers, "id">) => {
  const res = await api.post<Vouchers>(api.url.vouchers, data);
  return res.data;
};

const update = async (id: number, data: Omit<Vouchers, "id">) => {
  const res = await api.put<Vouchers>(`${api.url.vouchers}/${id}`, data);
  return res.data;
};

const remove = async (id: number) => {
  const res = await api.delete(`${api.url.vouchers}/${id}`);
  return res.data;
};

// Lấy voucher theo code
const getByCode = async (code: string) => {
  const res = await api.get<Vouchers[]>(`${api.url.vouchers}?code=${code}`);
  return res.data[0]; // vì filter theo code sẽ trả về mảng
};

const voucherService = { list, add, update, remove, getByCode };
export default voucherService;
