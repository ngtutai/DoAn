import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export interface Orders {
  id: number;
  code?: string;
  orderDate: string;
  status: "placed" | "processing" | "shipping" | "delivered" | "cancel";
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

  const formatOrderCode = (code?: string | number) => {
    if (code && typeof code === "string") return `#${code}`;
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

  // Hàm hủy
  const handleCancel = async (orderId: number) => {
    const confirmCancel = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}`);
      const latestOrder = await res.json();

      if (latestOrder.status === "delivered") {
        alert("Đơn hàng đã được giao, không thể hủy!");
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: "delivered" } : o
          )
        );
        return;
      }

      if (latestOrder.status === "cancel") {
        alert("Đơn hàng đã bị hủy trước đó!");
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: "cancel" } : o))
        );
        return;
      }

      await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancel" }),
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancel" } : o))
      );
    } catch (err) {
      console.error("Lỗi khi hủy đơn:", err);
      alert("Hủy không thành công!");
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "placed":
        return "Đã đặt hàng";
      case "processing":
        return "Chờ chuyển phát";
      case "shipping":
        return "Đang trung chuyển";
      case "delivered":
        return "Đã giao";
      case "cancel":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string, currentStatus: string) => {
    const statusOrder = ["placed", "processing", "shipping", "delivered"];
    if (!statusOrder.includes(currentStatus)) return "";
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex < currentIndex) return "step-completed";
    if (statusIndex === currentIndex) return "step-active";
    return "";
  };

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

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="row">
            <Sidebar />
            <div className="col-md-9 text-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          </section>

          <Sidebar />

          {/* Phần chỉnh sửa */}
          <div className="col-md-9">
            {orders.filter(
              (order) =>
                order.status !== "delivered" && order.status !== "cancel"
            ).length === 0 ? (
              <div className="alert alert-warning">
                Bạn không có đơn hàng nào đang xử lý.
              </div>
            ) : (
              orders
                .filter(
                  (order) =>
                    order.status !== "delivered" && order.status !== "cancel"
                )
                .map((order) => (
                  <div key={order.id} className="card mb-4 shadow-sm">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="text-dark">Mã đơn:</strong>{" "}
                        {formatOrderCode(order.code || order.id)}
                      </div>
                      <div className="text-muted">
                        Ngày đặt:{" "}
                        {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Tiến trình đơn hàng */}
                      <div className="row mb-3 text-center">
                        {["placed", "processing", "shipping", "delivered"].map(
                          (status, index) => (
                            <div
                              key={status}
                              className={`col-3 tracking-step ${getStatusClass(
                                status,
                                order.status
                              )}`}
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
                              <div className="step-title small">
                                {getStatusText(status)}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/* Nút Xem / Hủy */}
                      <div className="d-flex justify-content-end gap-2 mb-3">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancel(order.id)}
                        >
                          Hủy đơn
                        </button>

                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            setExpandedOrderId((prev) =>
                              prev === order.id ? null : order.id
                            )
                          }
                        >
                          {expandedOrderId === order.id
                            ? "Ẩn chi tiết"
                            : "Xem chi tiết"}
                        </button>
                      </div>

                      {/* Chi tiết sản phẩm */}
                      {expandedOrderId === order.id && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead className="table-secondary">
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
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString("vi-VN")}
                                    đ
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan={3} className="text-end">
                                  Phí vận chuyển:
                                </td>
                                <td>
                                  {order.shippingFee.toLocaleString("vi-VN")}đ
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="text-end fw-bold">
                                  Tổng cộng:
                                </td>
                                <td className="fw-bold text-danger">
                                  {order.total.toLocaleString("vi-VN")}đ
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
