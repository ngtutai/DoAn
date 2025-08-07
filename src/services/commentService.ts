// services/commentService.ts
import api from "./api";

export interface IComment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
  rating: number;
}

// Lấy danh sách bình luận
const list = () =>
  api.get<IComment[]>(api.url.comments).then((res) => res.data);
// Thêm mới bình luận
const add = (data: IComment) =>
  api.post<IComment>(api.url.comments, data).then((res) => res.data);
// Cập nhật bình luận
const update = (id: string, data: IComment) =>
  api.put<IComment>(`${api.url.comments}/${id}`, data).then((res) => res.data);
// Xóa bình luận
const remove = (id: string) =>
  api.delete<IComment>(`${api.url.comments}/${id}`).then((res) => res.data);

const commentService = { list, add, update, remove };
export default commentService;
