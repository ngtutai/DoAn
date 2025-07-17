import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";
import { toast } from "react-toastify";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Nếu có id → là sửa, không có → thêm

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [description, setDescription] = useState("");

  const isEditMode = Boolean(id);

  // ✅ Load dữ liệu nếu đang sửa
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:3001/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setPrice(data.price);
          setImage(data.image);
          setCategoryId(data.categoryId);
          setDescription(data.description);
          setPreview(
            `/assets/images/${
              data.categoryId === 1
                ? "Cho"
                : data.categoryId === 2
                ? "Meo"
                : "PhuKien"
            }/${data.image}`
          );
        });
    }
  }, [id, isEditMode]);

  // ✅ Chọn file ảnh và xem trước
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file.name); // chỉ lưu tên ảnh
      setPreview(URL.createObjectURL(file)); // xem trước ảnh
    }
  };

  // ✅ Gửi dữ liệu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = { name, price, image, categoryId, description };

    const url = isEditMode
      ? `http://localhost:3001/products/${id}`
      : "http://localhost:3001/products";

    fetch(url, {
      method: isEditMode ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then(() => {
        toast.success(
          isEditMode ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!"
        );
        navigate("/admin/product");
      })
      .catch(() => toast.error("Lỗi xử lý sản phẩm!"));
  };

  return (
    <div className="container-fluid bg-light text-start min-vh-100">
      <AdminHeader />
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
          <div className="container p-4">
            <h3>{isEditMode ? "Chỉnh sửa" : "Thêm mới"} sản phẩm</h3>
            <form
              onSubmit={handleSubmit}
              className="border p-4 rounded shadow-sm bg-light"
            >
              {/* Ảnh */}
              <div className="mb-3">
                <label className="form-label">Chọn ảnh sản phẩm</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-secondary bg-opacity-10"
                  onChange={handleFileChange}
                  required={!isEditMode}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-2"
                    style={{ width: 150, objectFit: "cover" }}
                  />
                )}
                <div className="form-text">
                  Hãy chắc chắn bạn đã thêm ảnh vào thư mục:
                  <br />
                  <code>
                    /assets/images/Cho/, /Meo/, hoặc /PhuKien/ (tùy danh mục)
                  </code>
                </div>
              </div>

              {/* Tên sản phẩm */}
              <div className="mb-3">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control bg-secondary bg-opacity-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Danh mục */}
              <div className="mb-3">
                <label className="form-label">Danh mục</label>
                <select
                  className="form-select bg-secondary bg-opacity-10"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                  <option value={1}>Chó</option>
                  <option value={2}>Mèo</option>
                  <option value={3}>Phụ kiện</option>
                </select>
              </div>

              {/* Giá */}
              <div className="mb-3">
                <label className="form-label">Giá</label>
                <input
                  type="number"
                  className="form-control bg-secondary bg-opacity-10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>

              {/* Mô tả */}
              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <textarea
                  className="form-control bg-secondary bg-opacity-10"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                ></textarea>
              </div>

              {/* Hành động */}
              <button type="submit" className="btn btn-success">
                {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/admin/product")}
              >
                Huỷ
              </button>
            </form>
          </div>
          <Menu />
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
