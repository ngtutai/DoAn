import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export interface Orders {
  id: number;
  code?: string; // Mã đơn hàng (tùy chọn nếu chưa có)
  orderDate: string;
  status: "placed" | "processing" | "shipping" | "delivered";
  items: OrderItem[];
  shippingFee: number;
  total: number;
}
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface UserData {
  user: {
    id: number;
    displayname: string;
    email: string;
    phone?: string;
    address?: string;
  };
  orders: Orders[];
}

export default function Order() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  // Hiển thị mã đơn hàng dạng #1234ABC
  const formatOrderCode = (code?: string | number) => {
    if (code && typeof code === "string") return `#${code}`;
    // Nếu chưa có mã thì tạo tạm theo id
    const id =
      typeof code === "number" ? code : Math.floor(1000 + Math.random() * 9000);
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");
    return `#${id}${letters}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);

      fetch(`http://localhost:3001/orders?userId=${userData.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy đơn hàng:", err);
          setOrders([]);
          setLoading(false);
        });
    }
  }, []);

  // Helper functions (same as previous implementation)
  const getStatusText = (status: string) => {
    switch (status) {
      case "placed":
        return "Đã đặt hàng";
      case "processing":
        return "Chờ chuyển phát";
      case "shipping":
        return "Đang trung chuyển";
      case "delivered":
        return "Đã giao đơn hàng";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string, currentStatus: string) => {
    const statusOrder = ["placed", "processing", "shipping", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex < currentIndex) return "step-completed";
    if (statusIndex === currentIndex) return "step-active";
    return "";
  };

  // Chưa Login Order (Đơn hàng) hiển thị "Bạn chưa đăng nhập!"
  if (!currentUser) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="row">
            <Sidebar />
            <h3 className="col-md-9 text-danger">Bạn chưa đăng nhập!</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="row">
            <Sidebar />
            <div className="col-md-9 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Đã Login Order (Đơn hàng) hiển thị "Bạn chưa có đơn hàng nào!"
  if (orders.length === 0) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="row">
            <Sidebar />
            <h3 className="col-md-9 text-danger">Bạn chưa có đơn hàng nào!</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <Fragment>
      <Header />

      <div className="container py-2">
        <div className="row">
          <section className="bread-crumb">
            <div className="container">
              <div className="row">
                <div className="col-12 a-left">
                  <ul className="breadcrumb">
                    <li className="home">
                      <a href="/" className="nav-link text-muted">
                        <span>Trang chủ</span>
                      </a>
                    </li>
                    <li>
                      <span className="mr_lr">&nbsp;/&nbsp;</span>
                      <strong>
                        <span>Đơn hàng</span>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <Sidebar />

          <div className="col-md-9">
            {/* Đã Login và có Order (Đơn hàng) hiển thị "Đơn hàng ra" */}
            {orders.map((order) => (
              <div key={order.id} className="card mb-2 shadow-sm mt-5">
                <div className="card-header bg-primary text-white">
                  <div className="d-flex justify-content-start align-items-center">
                    <h6 className="card-title mb-0 mt-1">
                      {" "}
                      Đơn hàng {formatOrderCode(order.code || order.id)}
                    </h6>
                    <span className="badge bg-light bg-opacity-50 text-dark ms-2 me-auto">
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </span>

                    <button
                      className="bg-light bg-opacity-25 badge"
                      onClick={() =>
                        setExpandedOrderId((prev) =>
                          prev === order.id ? null : order.id
                        )
                      }
                    >
                      {expandedOrderId === order.id ? "Ẩn" : "Xem"}
                    </button>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="card-body">
                    {/* Order tracking progress */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="row">
                          {[
                            "placed",
                            "processing",
                            "shipping",
                            "delivered",
                          ].map((status, index) => (
                            <div
                              key={status}
                              className={`col-3 tracking-step ${getStatusClass(
                                status,
                                order.status
                              )} ${index === 0 ? "step-first" : ""}`}
                            >
                              {index > 0 && <div className="step-line"></div>}
                              <div className="step-icon">
                                {status === "placed" && (
                                  <i className="fa-solid fa-check-circle"></i>
                                )}
                                {status === "processing" && (
                                  <i className="fa-solid fa-clock"></i>
                                )}
                                {status === "shipping" && (
                                  <i className="fa-solid fa-truck"></i>
                                )}
                                {status === "delivered" && (
                                  <i className="fa-solid fa-box-open"></i>
                                )}
                              </div>
                              <h6 className="step-title">
                                {getStatusText(status)}
                              </h6>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order details */}
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>{item.price.toLocaleString("vi-VN")}đ</td>
                              <td>
                                {(item.price * item.quantity).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan={3} className="text-end">
                              Tạm tính:
                            </th>
                            <td>
                              {(order.total - order.shippingFee).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </td>
                          </tr>
                          <tr>
                            <th colSpan={3} className="text-end">
                              Phí vận chuyển:
                            </th>
                            <td>
                              {order.shippingFee.toLocaleString("vi-VN")}đ
                            </td>
                          </tr>
                          <tr>
                            <th colSpan={3} className="text-end">
                              Tổng cộng:
                            </th>
                            <td>{order.total.toLocaleString("vi-VN")}đ</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
