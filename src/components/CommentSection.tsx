import React, { useEffect, useState } from "react";

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  content: string;
  date: string;
  rating?: number;
  userName?: string; // sẽ gán sau khi lấy từ users
}

export interface User {
  id: string;
  displayname: string;
}

export interface Props {
  productId: string;
}

const CommentSection: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchCommentsAndUsers = async () => {
      try {
        const [cmtRes, userRes] = await Promise.all([
          fetch("http://localhost:3001/comments"),
          fetch("http://localhost:3001/users"),
        ]);

        const commentsData: Comment[] = await cmtRes.json();
        const usersData: User[] = await userRes.json();

        // Gắn tên user vào comment
        const combined = commentsData
          .filter((c) => c.productId.toString() === productId)
          .map((c) => {
            const foundUser = usersData.find(
              (u) => u.id.toString() === c.userId.toString()
            );
            return {
              ...c,
              userName: foundUser ? foundUser.displayname : "Ẩn danh",
            };
          });

        setComments(combined);
        setUsers(usersData);
      } catch (error) {
        console.error("Lỗi tải bình luận hoặc người dùng:", error);
      }
    };

    fetchCommentsAndUsers();
  }, [productId]);

  return (
    <div className="mt-5">
      <h4 className="mb-4 text-start">Đánh giá & Bình luận</h4>

      {comments.length === 0 && (
        <p className="text-start">Chưa có bình luận nào.</p>
      )}
      {comments.map((cmt) => (
        <div key={cmt.id} className="border p-3 mb-3 rounded bg-light">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold text-primary">
                {cmt.userName}{" "}
                <span className="text-muted" style={{ fontSize: "13px" }}>
                  ({new Date(cmt.date).toLocaleDateString("vi-VN")})
                </span>
              </div>

              <div className="text-warning mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${
                        i < (cmt.rating || 5) ? "fas" : "far"
                      } me-1`}
                    ></i>
                  ))}
              </div>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="fa-solid fa-pen-to-square me-1"></i> Sửa
            </button>
          </div>

          <textarea
            className="form-control bg-white"
            rows={3}
            value={cmt.content}
            disabled
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
