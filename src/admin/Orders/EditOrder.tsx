// src/admin/EditOrder.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<Order["status"]>("placed");

  const statusOptions: Order["status"][] = [
    "placed",
    "processing",
    "shipping",
    "delivered",
    "cancel",
  ];

  useEffect(() => {
    fetch(`http://localhost:3001/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
      });
  }, [id]);

  const handleSave = () => {
    if (!order) return;

    fetch(`http://localhost:3001/orders/${order.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...order, status }),
    })
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/admin/order");
      })
      .catch((err) => console.error("Lỗi:", err));
  };

  if (!order) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const isCanceled = order.status === "cancel";
  const isDelivered = order.status === "delivered";
  const isFinalized = isCanceled || isDelivered;

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
            <h4 className="mb-3">
              Cập nhật đơn hàng #{order.code || order.id}
              {isCanceled && (
                <span className="badge bg-danger ms-2">Đã hủy</span>
              )}
              {isDelivered && (
                <span className="badge bg-success ms-2">Đã giao</span>
              )}
            </h4>

            <div className="mb-4">
              <label className="form-label">Trạng thái đơn hàng:</label>
              <select
                className="form-select"
                value={status}
                disabled={isFinalized}
                onChange={(e) => setStatus(e.target.value as Order["status"])}
              >
                {statusOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    disabled={(opt === "cancel" && !isCanceled) || isFinalized}
                  >
                    {getStatusText(opt)}
                  </option>
                ))}
              </select>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString("vi-VN")}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isFinalized && (
              <div className="text-end">
                <button className="btn btn-success" onClick={handleSave}>
                  Lưu
                </button>
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
