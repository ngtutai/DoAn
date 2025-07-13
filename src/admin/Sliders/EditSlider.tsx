import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

interface Slider {
  id?: number;
  image: string;
  title: string;
  description: string;
}

export default function EditSlider() {
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
      fetch(`http://localhost:3002/sliders/${id}`)
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
      ? `http://localhost:3002/sliders/${id}`
      : `http://localhost:3002/sliders`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Thêm mới thành công");
        navigate("/admin/slider");
      })
      .catch(() => toast.error("Lỗi khi lưu slider"));
  };

  return (
    <div className="container-fluid bg-light text-start min-vh-100">
      <AdminHeader />
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
          {/* Phần thông tin cần làm */}
          <div className="container p-4">
            <h3>{id ? "Chỉnh sửa" : "Thêm"} slider</h3>
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
                  rows={3}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success">
                {id ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/admin/slider")}
              >
                Huỷ
              </button>
            </form>
          </div>
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
