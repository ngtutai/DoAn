import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";
import commentService, { IComment } from "../../services/commentService";

function CommentList() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dùng service thay vì fetch thô
    commentService
      .list()
      .then((data) => {
        setComments(data.reverse()); // Mới nhất lên trước
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy comments:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3">
          <h4 className="mb-4 text-secondary">Danh sách bình luận</h4>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="alert alert-warning text-center">
              Không có bình luận nào!
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered bg-white">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Sản phẩm</th>
                    <th>Người dùng</th>
                    <th>Bình luận</th>
                    <th>Đánh giá</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((cmt, index) => (
                    <tr key={cmt.id}>
                      <td>{index + 1}</td>
                      <td>{cmt.productId}</td>
                      <td>{cmt.userName}</td>
                      <td>{cmt.content}</td>
                      <td>
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={
                              i < cmt.rating
                                ? "fa-solid fa-star text-warning"
                                : "fa-regular fa-star text-secondary"
                            }
                          ></i>
                        ))}
                      </td>
                      <td>{new Date(cmt.date).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}

export default CommentList;
