import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

export interface Productx {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Productx[]>([]);

  const fetchProducts = () => {
    // Read (Đọc dữ liệu) CRUD
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const getCategoryName = (id: number): string => {
          if (id === 1) return "Chó";
          if (id === 2) return "Mèo";
          return "Phụ kiện";
        };

        // Sắp xếp theo tên loại sản phẩm (A-Z)
        const sortedData = data.sort((a: Productx, b: Productx) => {
          const nameA = getCategoryName(a.categoryId);
          const nameB = getCategoryName(b.categoryId);
          return nameA.localeCompare(nameB);
        });

        setProducts(sortedData);
      })
      .catch(() => toast.error("Lỗi tải sản phẩm"));
  };

  // Delete (Xóa dữ liệu) CRUD
  const handleDelete = (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) return;

    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Đã xóa sản phẩm");
        fetchProducts();
      })
      .catch(() => alert("Lỗi xoá sản phẩm!"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid bg-light text-start min-vh-100">
        <AdminHeader />
        <div className="row g-0">
          <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
            <AdminSidebar />
          </div>
          <div className="col-12 col-md-10 bg-secondary bg-opacity-25">
            {/* Phần thông tin cần làm */}
            <div className="container p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Sản phẩm</h3>
                <Link to="/admin/product/new" className="btn btn-primary">
                  <i className="fa fa-plus me-2"></i> Thêm sản phẩm
                </Link>
              </div>
              <table className="table table-bordered table-hover text-center">
                <thead className="table-warning">
                  <tr>
                    <th>ID</th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Loại</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={`/assets/images/${
                            item.categoryId === 1
                              ? "Cho"
                              : item.categoryId === 2
                              ? "Meo"
                              : "PhuKien"
                          }/${item.image}`}
                          alt=""
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{item.name}</td>

                      <td>
                        {item.categoryId === 1
                          ? "Chó"
                          : item.categoryId === 2
                          ? "Mèo"
                          : "Phụ kiện"}
                      </td>
                      <td>{item.price.toLocaleString("vi-VN")}₫</td>
                      <td>
                        <Link
                          to={`/admin/product/edit/${item.id}`}
                          className="me-2"
                        >
                          <button className="btn btn-info">Sửa</button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Menu />
        <AdminFooter />
      </div>
    </Fragment>
  );
}
