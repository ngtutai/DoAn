// services/sliderService.ts
import api from "./api";

export interface SliderItem {
  id?: number;
  image: string;
  title: string;
  description: string;
}

const list = () =>
  api.get<SliderItem[]>(api.url.sliders).then((res) => res.data);

const get = (id: number) =>
  api.get<SliderItem>(`${api.url.sliders}/${id}`).then((res) => res.data);

const add = (data: SliderItem) =>
  api.post<SliderItem>(api.url.sliders, data).then((res) => res.data);

const update = (id: number, data: SliderItem) =>
  api.put<SliderItem>(`${api.url.sliders}/${id}`, data).then((res) => res.data);

const remove = (id: number) =>
  api.delete(`${api.url.sliders}/${id}`).then((res) => res.data);

const sliderService = { list, get, add, update, remove };
export default sliderService;
