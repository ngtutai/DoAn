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
  status: "placed" | "processing" | "shipping" | "delivered" | "cancel";
  shippingFee: number;
  total: number;
  items: OrderItem[];
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
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
      case "paid":
        return "Chờ xác nhận";
      case "placed":
        return "Đã đặt hàng";
      case "processing":
        return "Chờ xử lý";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-bg-dark";
      case "placed":
        return "text-bg-primary";
      case "processing":
        return "text-bg-warning";
      case "shipping":
        return "text-bg-info";
      case "delivered":
        return "text-bg-secondary";
      case "cancel":
        return "text-bg-danger";
      default:
        return "text-bg-success";
    }
  };

  // 👉 Chỉ lấy đơn hàng chưa hoàn tất/hủy
  const activeOrders = orders.filter(
    (order) => order.status !== "delivered" && order.status !== "cancel"
  );

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
            <h4 className="mb-4 text-secondary">Đơn hàng đang chờ xử lý</h4>
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" />
              </div>
            ) : activeOrders.length === 0 ? (
              <div className="alert alert-warning text-center">
                Hiện không có đơn hàng!
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
                    {activeOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.code || `#${order.id}`}</td>
                        <td>
                          {new Date(order.orderDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusColor(order.status)}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td>{order.total.toLocaleString("vi-VN")}đ</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/admin/order/${order.id}`)}
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
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
