import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  code: string;
  userId: string;
  orderDate: string;
  status: "placed" | "processing" | "shipping" | "delivered";
  shippingFee: number;
  total: number;
  items: OrderItem[];
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy đơn hàng:", err);
        setLoading(false);
      });
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case "placed":
        return "Đã đặt hàng";
      case "processing":
        return "Chờ xử lý";
      case "shipping":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      default:
        return status;
    }
  };

  // Màu bagde tương ứng với gettatusTextS
  const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "text-bg-primary"; // Xanh dương ( Đã đặt hàng )
      case "processing":
        return "text-bg-warning"; // Vàng ( Chờ xử lý )
      case "shipping":
        return "text-bg-info"; // Xanh nhạt ( Đang giao )
      case "delivered":
        return "text-bg-secondary"; // Xanh lá ( Đã giao )
      case "cancel":
        return "text-bg-danger"; // Đỏ ( Đã hủy )
      default:
        return "text-bg-success"; // Xám (  )
    }
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
          <div className="container py-4">
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" />
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Mã đơn</th>
                      <th>Ngày đặt</th>
                      <th>Trạng thái</th>
                      <th>Tổng cộng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <React.Fragment key={order.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order.code || `#${order.id}`}</td>
                          <td>
                            {new Date(order.orderDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td>{order.total.toLocaleString("vi-VN")}đ</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                navigate(`/admin/order/${order.id}`)
                              }
                            >
                              Chi tiết
                            </button>
                          </td>
                        </tr>

                        {expandedOrderId === order.id && (
                          <tr>
                            <td colSpan={6}>
                              <div className="p-3 bg-light rounded">
                                <h6>Chi tiết sản phẩm:</h6>
                                <ul className="list-group">
                                  {order.items.map((item) => (
                                    <li
                                      key={item.id}
                                      className="list-group-item d-flex justify-content-between"
                                    >
                                      <div>
                                        {item.name} x {item.quantity}
                                      </div>
                                      <div>
                                        {(
                                          item.price * item.quantity
                                        ).toLocaleString("vi-VN")}
                                        đ
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                                <div className="text-end mt-2">
                                  <strong>
                                    Phí ship:{" "}
                                    {order.shippingFee.toLocaleString("vi-VN")}đ
                                  </strong>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Menu />
      <AdminFooter />
    </div>
  );
}
