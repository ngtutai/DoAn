import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  code: string;
  userId: number;
  orderDate: string;
  status: "delivered" | "cancel";
  shippingFee: number;
  total: number;
  items: OrderItem[];
}

export default function HistoryOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      fetch(`http://localhost:3001/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (o: Order) => o.status === "delivered" || o.status === "cancel"
          );
          setOrders(filtered);
        })
        .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
    }
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Đã giao";
      case "cancel":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const formatOrderCode = (code: string | number) => {
    return `#${code}`;
  };

  return (
    <>
      <Header />
      <div className="container py-3">
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
                    <span>Lịch sử</span>
                  </strong>
                </li>
              </ul>
            </div>
          </section>

          <Sidebar />

          {/* Phần chỉnh sửa */}
          <div className="col-md-9">
            {orders.length === 0 ? (
              <div className="alert alert-warning">
                Bạn chưa có đơn hàng đã giao hoặc đã hủy.
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="card mb-4 shadow-sm mt-4">
                  <div className="card-header bg-secondary bg-opacity-75 text-white">
                    <div className="d-flex justify-content-start align-items-center">
                      <h6 className="card-title mb-0 mt-1">
                        Đơn hàng {formatOrderCode(order.code || order.id)}
                      </h6>
                      <span className="badge bg-light bg-opacity-50 text-dark ms-2 me-auto">
                        {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                      </span>

                      <span
                        className={`badge ${
                          order.status === "delivered"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {order.status === "delivered" ? "Đã giao" : "Đã hủy"}
                      </span>

                      <button
                        className="bg-light bg-opacity-25 badge ms-2"
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
                      {/* Table chi tiết đơn hàng */}
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-light">
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
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
