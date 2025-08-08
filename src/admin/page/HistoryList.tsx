import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";
import orderService, { Order } from "../../services/ortherService";

function HistoryList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    orderService
      .list()
      .then((data) => {
        const filtered = data.filter(
          (o) => o.status === "delivered" || o.status === "cancel"
        );
        setOrders(filtered);
      })
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  }, []);

  const formatOrderCode = (code: string | number) => {
    return `#${code}`;
  };

  return (
    <div className="container-fluid bg-light text-start min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="row g-0 flex-grow-1">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3">
          <h4 className="mb-4 text-secondary">Lịch sử đơn hàng</h4>

          {orders.length === 0 ? (
            <div className="alert alert-warning text-center">
              Chưa có đơn hàng đã giao hoặc đã hủy.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="card mb-2 shadow-sm">
                <div className="card-header bg-secondary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      Đơn hàng {formatOrderCode(order.code || order.id)}
                    </h6>
                    <span className="badge bg-light text-dark">
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
                      className="badge bg-light bg-opacity-50 ms-2"
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
      <Menu />
      <AdminFooter />
    </div>
  );
}
export default HistoryList;
