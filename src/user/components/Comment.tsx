import React, { useEffect, useState } from "react";
import api from "../../services/api"; // điều chỉnh lại đường dẫn nếu cần

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  content: string;
  date: string;
  rating?: number;
  userName?: string;
}

export interface User {
  id: string;
  displayname: string;
}

export interface Props {
  productId: string;
}

const Comments: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const time = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.toLocaleDateString("vi-VN");
    return `${time} - ${day}`;
  };

  const fetchCommentsAndUsers = async () => {
    try {
      const [cmtRes, userRes] = await Promise.all([
        api.get(`${api.url.comments}?productId=${productId}`),
        api.get(api.url.users),
      ]);

      const commentsData: Comment[] = cmtRes.data;
      const usersData: User[] = userRes.data;

      const combined = commentsData.map((c) => {
        const foundUser = usersData.find((u) => u.id === c.userId);
        return {
          ...c,
          userName: foundUser ? foundUser.displayname : "Ẩn danh",
        };
      });

      setComments(combined);
      setUsers(usersData);

      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const matchedUser = usersData.find((u) => u.id === parsed.id);
        if (matchedUser) setCurrentUser(matchedUser);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchCommentsAndUsers();
  }, [productId]);

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập để bình luận.");
      return;
    }

    if (newComment.trim() === "") {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }

    const newCmt: Comment = {
      id: Date.now().toString(),
      productId,
      userId: currentUser.id,
      content: newComment.trim(),
      date: new Date().toISOString(),
      rating,
      userName: currentUser.displayname,
    };

    try {
      await api.post(api.url.comments, newCmt);
      setComments((prev) => [...prev, newCmt]);
      setNewComment("");
      setRating(5);
    } catch (error) {
      console.error("Lỗi gửi bình luận:", error);
    }
  };

  return (
    <div className="mt-5">
      <h4 className="mb-4 text-start">Đánh giá & Bình luận</h4>

      {currentUser ? (
        <div className="border p-3 mb-4 bg-white rounded text-start">
          <div className="fw-bold mb-2">{currentUser.displayname}</div>

          <div className="mb-2 text-warning">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <i
                  key={i}
                  className={`fa-star ${i < rating ? "fas" : "far"} me-1`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setRating(i + 1)}
                ></i>
              ))}
          </div>

          <textarea
            rows={3}
            className="form-control mb-2 text-start"
            placeholder="Nhập bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <button className="btn btn-success" onClick={handleSubmit}>
            Gửi bình luận
          </button>
        </div>
      ) : (
        <p className="text-muted text-start">
          Vui lòng đăng nhập để bình luận.
        </p>
      )}

      {comments.length === 0 && (
        <p className="text-start">Chưa có bình luận nào.</p>
      )}
      {comments.map((cmt) => (
        <div
          key={cmt.id}
          className="border p-3 mb-3 rounded bg-light text-start"
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="fw-bold text-primary">
                {cmt.userName}{" "}
                <span className="text-muted" style={{ fontSize: "13px" }}>
                  ({formatDateTime(cmt.date)})
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
          </div>

          <textarea
            className="form-control bg-white text-start"
            rows={3}
            value={cmt.content}
            disabled
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default Comments;
