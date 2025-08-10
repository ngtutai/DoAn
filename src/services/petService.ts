import api from "./api";

export interface IPet {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;
  description?: string;
}

// Danh sách thú cưng
const list = () => api.get<IPet[]>(api.url.pets).then((res) => res.data);

// Lấy theo ID
const get = (id: number) =>
  api.get<IPet>(`${api.url.pets}/${id}`).then((res) => res.data);
const add = (data: Omit<IPet, "id">) =>
  api.post<IPet>(api.url.pets, data).then((res) => res.data);

const update = (id: number, data: IPet) =>
  api.put<IPet>(`${api.url.pets}/${id}`, data).then((res) => res.data);

const remove = (id: number) =>
  api.delete<IPet>(`${api.url.pets}/${id}`).then((res) => res.data);

const petService = { list, get, add, update, remove };
export default petService;
