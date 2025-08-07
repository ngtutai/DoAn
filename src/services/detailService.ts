import api from "./api";

export interface IDetail {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  description?: string;
}

const get = (id: string) =>
  api.get<IDetail>(`/pets/${id}`).then((res) => res.data);

const detailService = { get };
export default detailService;
