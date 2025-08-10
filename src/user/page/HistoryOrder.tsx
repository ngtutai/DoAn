import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import orderService, { Order } from "../../services/ortherService";

function HistoryOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setCurrentUser] = useState<any>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      orderService
        .list()
        .then((data) => {
          // Lọc đúng user và trạng thái
          const filtered = data.filter(
            (o) =>
              o.userId === user.id &&
              (o.status === "delivered" || o.status === "cancel")
          );
          setOrders(filtered);
        })
        .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
    }
  }, []);

  const formatOrderCode = (code: string | number) => {
    return `#${code}`;
  };

  return (
    <>
      <div className="container py-3">
        <div className="row">
          <section className="bread-crumb mb-3">
            <div className="col-12">
              <ul className="breadcrumb">
                <li className="home">
                  <a href="/" className="text-muted text-decoration-none">
                    <i className="fa fa-home me-1"></i>Trang chủ
                  </a>
                </li>
                <li>
                  <span className="mx-2">/</span>
                  <strong>Lịch sử đơn hàng</strong>
                </li>
              </ul>
            </div>
          </section>
          <Sidebar />

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
    </>
  );
}
export default HistoryOrder;
