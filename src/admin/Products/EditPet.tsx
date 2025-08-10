import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
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
      ? `http://localhost:3001/pets/${id}`
      : "http://localhost:3001/pets";

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
    <>
      {/* Phần thông tin cần làm */}
      <div className="container p-4">
        <h3 className="text-secondary">
          {isEditMode ? "Sửa" : "Thêm"} sản phẩm
        </h3>
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
          <button type="submit" className="btn btn-outline-primary">
            <i className="fa-solid fa-floppy-disk me-2"></i>
            {isEditMode ? "Lưu" : "Thêm"}
          </button>
          <button
            type="button"
            className="btn btn-outline-success ms-2"
            onClick={() => navigate("/admin/product")}
          >
            <i className="fa-solid fa-xmark me-2"></i>Hủy
          </button>
        </form>
      </div>
    </>
  );
}
export default EditProduct;
