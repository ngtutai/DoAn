import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Slider {
  id?: number;
  image: string;
  title: string;
  description: string;
}

function EditSlider() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");
  const [form, setForm] = useState<Slider>({
    image: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/sliders/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data);
          setPreview(`/assets/images/slide/${data.image}`);
        })
        .catch(() => toast.error("Không tải được slider"));
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file.name }); // chỉ lưu tên ảnh
      setPreview(URL.createObjectURL(file)); // xem trước ảnh
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:3001/sliders/${id}`
      : `http://localhost:3001/sliders`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        toast.success(id ? "Sửa thành công" : "Thêm thành công");
        navigate("/admin/slider");
      })
      .catch(() => toast.error("Lỗi khi lưu slider"));
  };

  return (
    <>
      {/* Phần thông tin cần làm */}
      <div className="container mt-4">
        <h3 className="text-secondary">{id ? "Sửa" : "Thêm"} slider</h3>
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow-sm bg-light"
        >
          <div className="mb-3">
            <label>Chọn ảnh:</label>
            <input
              type="file"
              accept="image/*"
              className="form-control bg-secondary bg-opacity-10"
              onChange={handleFileChange}
              required={!id}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{ width: 150, marginTop: 10, objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label>Tiêu đề:</label>
            <input
              type="text"
              name="title"
              className="form-control bg-secondary bg-opacity-10"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Mô tả:</label>
            <textarea
              name="description"
              className="form-control bg-secondary bg-opacity-10"
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-outline-primary">
            <i className="fa-solid fa-floppy-disk me-2"></i>
            {id ? "Lưu" : "Thêm"}
          </button>
          <button
            type="button"
            className="btn btn-outline-success ms-2"
            onClick={() => navigate("/admin/slider")}
          >
            <i className="fa-solid fa-xmark me-2"></i>
            Hủy
          </button>
        </form>
      </div>
    </>
  );
}

export default EditSlider;
