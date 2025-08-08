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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const fetchProducts = () => {
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((data) => {
        const getCategoryName = (id: number): string => {
          if (id === 1) return "Chó";
          if (id === 2) return "Mèo";
          return "Phụ kiện";
        };

        const sortedData = data.sort((a: Productx, b: Productx) => {
          const nameA = getCategoryName(a.categoryId);
          const nameB = getCategoryName(b.categoryId);
          return nameA.localeCompare(nameB);
        });

        setProducts(sortedData);
      })
      .catch(() => toast.error("Lỗi tải sản phẩm"));
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) return;

    fetch(`http://localhost:3001/pets/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Đã xóa sản phẩm");
        fetchProducts();
      })
      .catch(() => toast.error("Lỗi xoá sản phẩm!"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <Fragment>
      <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
        <AdminHeader />
        <div className="row g-0 flex-grow-1">
          <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
            <AdminSidebar />
          </div>
          <div className="col-md-10 col-12 bg-secondary bg-opacity-25">
            {/* Phần thông tin cần làm */}
            <div className="container p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-secondary">Sản phẩm</h3>
                <Link to="/admin/product/new" className="btn btn-primary">
                  <i className="fa fa-plus me-2"></i>Thêm
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
                    <th style={{ width: "20%" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((item) => (
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
                      <td>{item.price.toLocaleString("vi-VN")} ₫</td>
                      <td>
                        <Link
                          to={`/admin/product/edit/${item.id}`}
                          className="me-2"
                        >
                          <button className="btn btn-outline-info">
                            <i className="fa-solid fa-pen-to-square me-2"></i>
                            Sửa
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="fa-solid fa-trash me-2"></i>Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Phân trang */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      &laquo;
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <Menu />
        <AdminFooter />
      </div>
    </Fragment>
  );
}
