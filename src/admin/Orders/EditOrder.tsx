import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderService, { Order } from "../../services/ortherService";

function EditOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<Order["status"]>("placed");

  const statusOptions: Order["status"][] = [
    "paid",
    "placed",
    "processing",
    "shipping",
    "delivered",
    "cancel",
  ];

  useEffect(() => {
    if (!id) return;

    orderService
      .get(Number(id))
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
      })
      .catch((error) => {
        toast.error("Lấy dữ liệu thất bại: " + error.message);
        navigate("/admin/order");
      });
  }, [id, navigate]);

  const handleSave = () => {
    if (!order) return;

    orderService
      .update(order.id, { ...order, status })
      .then(() => {
        toast.success("Cập nhật thành công!");
        navigate("/admin/order");
      })
      .catch((err) => {
        toast.error("Lỗi: " + err.message);
      });
  };

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const isCanceled = order.status === "cancel";
  const isDelivered = order.status === "delivered";
  const isFinalized = isCanceled || isDelivered;

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Chờ xác nhận";
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
    <div className="container py-4">
      <h4 className="mb-3">
        Cập nhật đơn hàng #{order.code || order.id}
        {isCanceled && <span className="badge bg-danger ms-2">Đã hủy</span>}
        {isDelivered && <span className="badge bg-success ms-2">Đã giao</span>}
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
          <button className="btn btn-outline-primary me-2" onClick={handleSave}>
            Lưu
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => navigate("/admin/order")}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
}

export default EditOrder;
