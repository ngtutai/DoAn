import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QR from "../pay/QR";
import COD from "../pay/COD";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  checked: boolean;
}

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [, setIsPaid] = useState(false);
  // Voucher
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherPercent, setVoucherPercent] = useState(0);
  const [voucherCode, setVoucherCode] = useState("Chưa áp dụng");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherValid, setVoucherValid] = useState<boolean | null>(null);
  const [voucherList, setVoucherList] = useState<
    {
      code: string;
      percent: number;
      startDate: string;
      endDate: string;
      usageLimit: number;
      id: string;
    }[]
  >([]);
  // Thanh toán
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCODModal, setShowCODModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"atm" | "cod">("atm");

  const navigate = useNavigate();

  // Load cart từ localStorage + server khi trang Cart mở
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const userId = storedUser ? JSON.parse(storedUser).id : null;
    const cartKey = userId ? `cart_${userId}` : "cart";

    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) {
      const loadedCart: CartItem[] = JSON.parse(storedCart).map(
        (item: CartItem) => ({
          ...item,
          checked: false, // ❗ Mặc định không chọn sản phẩm nào
        })
      );
      setItems(loadedCart);
    }

    // Fetch voucher list
    fetch("http://localhost:3001/vouchers")
      .then((res) => res.json())
      .then((data) => setVoucherList(data))
      .catch(() => toast.error("Không thể tải danh sách voucher"));
  }, []);

  // Khi cập nhật cart
  const updateCart = (newItems: CartItem[]) => {
    const storedUser = localStorage.getItem("currentUser");
    const userId = storedUser ? JSON.parse(storedUser).id : null;
    const cartKey = userId ? `cart_${userId}` : "cart";

    setItems(newItems);
    localStorage.setItem(cartKey, JSON.stringify(newItems));
  };

  // giá
  const total = items.reduce(
    (sum, i) => (i.checked ? sum + i.price * i.quantity : sum),
    0
  );
  const final = total - (total * voucherPercent) / 100;

  // ✅ Lưu đơn hàng vào db.json
  const saveOrderToServer = async (
    itemsToOrder: CartItem[],
    method: "atm" | "cod"
  ) => {
    // Tính giá khi nhập voucher
    const storedUser = localStorage.getItem("currentUser");
    const userId = storedUser ? JSON.parse(storedUser).id : "guest";
    const orderDate = new Date().toISOString();
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const originalTotal = itemsToOrder.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const totalPrice = originalTotal - (originalTotal * voucherPercent) / 100;

    const order = {
      id: Date.now().toString(),
      code,
      userId,
      orderDate,
      status: method === "atm" ? "paid" : "placed",
      shippingFee: 0,
      total: totalPrice,
      items: itemsToOrder.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
    };

    try {
      await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch (err) {
      toast.error("Không thể lưu đơn hàng vào hệ thống");
    }
  };

  // Áp dụng mã Voucher
  const applyVoucher = () => {
    const code = voucherInput.trim();
    const found = voucherList.find((v) => v.code === code);

    // Nếu không nhập mã
    if (!code) {
      setVoucherMessage("Vui lòng nhập mã giảm giá");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
      return;
    }

    // Nếu không tìm thấy trong danh sách
    if (!found) {
      setVoucherMessage("Mã giảm giá không hợp lệ");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
      return;
    }

    // Lấy ngày hiện tại và chuyển định dạng ngày từ JSON sang Date
    const today = new Date();
    const start = new Date(found.startDate + "T00:00:00");
    const end = new Date(found.endDate + "T23:59:59");

    // So sánh ngày
    if (today < start) {
      setVoucherMessage("Mã giảm giá chưa có hiệu lực");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
    } else if (today > end) {
      setVoucherMessage("Mã giảm giá đã hết hạn");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
    } else if (found.usageLimit <= 0) {
      setVoucherMessage("Mã giảm giá đã hết lượt sử dụng");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
    } else {
      // Áp dụng voucher thành công
      setVoucherPercent(found.percent);
      setVoucherCode(found.code);
      setVoucherMessage(`Đã áp dụng mã ${found.code} giảm ${found.percent}%`);
      setVoucherValid(true);

      // Gửi PATCH giảm usageLimit trên server
      fetch(`http://localhost:3001/vouchers/${found.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usageLimit: found.usageLimit - 1 }),
      }).catch(() => {
        toast.error("Không thể cập nhật lượt sử dụng voucher");
      });
    }
  };

  // Tick input từng cái
  const handleItemCheck = (i: number) => {
    const updated = [...items];
    updated[i].checked = !updated[i].checked;
    setCheckAll(updated.every((item) => item.checked));
    updateCart(updated);
  };

  // Tick input all
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const updated = items.map((item) => ({ ...item, checked }));
    setCheckAll(checked);
    updateCart(updated);
  };

  // Hàm số lượng [ - SL + ]
  const handleQuantityChange = (i: number, delta: number) => {
    const updated = [...items];
    updated[i].quantity = Math.max(1, updated[i].quantity + delta);
    updateCart(updated);
  };

  // Hàm Xóa
  const handleDelete = (i: number) => {
    const updated = items.filter((_, idx) => idx !== i);
    updateCart(updated);
  };

  // Hàm Xóa tất cả
  const handleDeleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ sản phẩm?")) {
      updateCart([]);
      toast.success("Đã xóa toàn bộ sản phẩm");
    }
  };

  // ✅ Thanh toán bằng QR
  const handlePayment = async () => {
    if (total === 0) return toast.warning("Bạn chưa chọn sản phẩm nào.");
    const itemsToOrder = items.filter((item) => item.checked);

    if (paymentMethod === "atm") {
      const id = "demo_" + Date.now();
      setOrderId(id);
      setShowQRModal(true);

      const interval = setInterval(async () => {
        if (localStorage.getItem("orderStatus_" + id) === "paid") {
          clearInterval(interval);
          toast.success("Thanh toán thành công!");
          setShowQRModal(false);
          await saveOrderToServer(itemsToOrder, "atm"); // ✅ lưu
          const updated = items.filter((item) => !item.checked);
          updateCart(updated);
          setIsPaid(true);
        }
      }, 2000);
    } else {
      setShowCODModal(true);
    }
  };

  // ✅ Thanh toán COD
  const handleCODConfirm = async (address: string) => {
    toast.success("Đặt hàng thành công!\nĐịa chỉ: " + address);
    setShowCODModal(false);
    const itemsToOrder = items.filter((item) => item.checked);
    await saveOrderToServer(itemsToOrder, "cod"); // ✅ lưu
    const updated = items.filter((item) => !item.checked);
    updateCart(updated);
  };

  // ==== UI ====
  return (
    <Fragment>
      <Header />
      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-cart.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "550px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Giỏ hàng</h1>
          <div className="col-12 ms-4">
            <ul className="breadcrumb">
              <li className="home">
                <a href="/" className="nav-link text-muted">
                  <strong>
                    <span>Trang chủ</span>
                  </strong>
                </a>
              </li>
              <li>
                <span className="mr_lr">&nbsp;/&nbsp;</span>
                <strong>
                  <span className="text-danger">Giỏ hàng</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phần cần làm cho bài */}
      <div className="container-fluid text-start">
        <div className="row p-2 mt-2">
          {/* Left Sidebar */}
          <div className="col-12 col-md-8 mb-3 border-end border-1 border-dark">
            <div className="row">
              <div className="col">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-warning fw-bold">
                    <tr>
                      <th style={{ width: "7%" }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={checkAll}
                          onChange={handleCheckAll}
                        />{" "}
                        <label className="form-check-label"> All</label>
                      </th>
                      <th style={{ width: "5%" }}>ID</th>
                      <th style={{ width: "20%" }}>Image</th>
                      <th style={{ width: "40%" }}>Name Product</th>
                      <th style={{ width: "11%" }}>Quantity</th>
                      <th style={{ width: "11%" }}>Price</th>
                      <th style={{ width: "6%" }}>Delete</th>
                    </tr>
                  </thead>

                  {/* Sản phẩm Quantity */}
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input item-check"
                            checked={item.checked}
                            onChange={() => handleItemCheck(index)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image || "https://placehold.co/100x100"}
                            alt={item.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            onClick={() => navigate(`/detail/${item.id}`)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <i
                              className="fa-solid fa-minus text-dark btn-minus"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQuantityChange(index, -1)}
                            />
                            <span
                              className="quantity px-2 border rounded text-dark text-center"
                              style={{ minWidth: 30 }}
                            >
                              {item.quantity}
                            </span>
                            <i
                              className="fa-solid fa-plus text-dark btn-plus"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleQuantityChange(index, 1)}
                            />
                          </div>
                        </td>
                        <td className="price">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                        <td>
                          <i
                            className="fa-solid fa-trash text-danger btn-delete"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Xóa all */}
                  <tfoot>
                    <tr>
                      <td
                        colSpan={7}
                        className="text-end bg-secondary bg-opacity-10"
                      >
                        <button
                          className="btn btn-danger"
                          onClick={handleDeleteAll}
                          disabled={items.length === 0}
                        >
                          Xóa toàn bộ
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-12 col-md-4">
            <h5 className="text-danger">Mã giảm giá</h5>
            <div className="row">
              <div className="col">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập mã voucher"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={applyVoucher}>
                    Áp dụng
                  </button>
                </div>
                <div
                  className={
                    voucherValid === null
                      ? ""
                      : voucherValid
                      ? "mt-2 text-primary"
                      : "mt-2 text-danger"
                  }
                  style={{ minHeight: 24 }}
                >
                  {voucherMessage}
                </div>

                <hr />
                <div className="border p-3 rounded">
                  <p>
                    Tạm tính :{" "}
                    <span id="totalPrice" className="text-muted fw-bold">
                      {formatCurrency(total)}
                    </span>
                  </p>
                  <hr />
                  <i className="fa-solid fa-ticket text-danger" /> Voucher :
                  <span className="text-danger" id="voucherName">
                    {" "}
                    {voucherCode}
                  </span>
                  <p>
                    <i className="fa-solid fa-tag text-danger me-2"></i>
                    Giảm :{" "}
                    <span className="text-danger fw-bold">
                      {voucherPercent}%
                    </span>
                  </p>
                  <hr />
                  <p>
                    <i className="fa-solid fa-truck-fast me-1"></i>
                    Phí vận chuyển :{" "}
                    <span className="text-muted">Miễn phí</span>
                  </p>
                  <p>
                    Tổng :{" "}
                    <span id="finalPrice" className="text-muted fw-bold">
                      {formatCurrency(final)}
                    </span>
                  </p>
                  <hr />
                  <h6 className="fw-bold">Thanh toán bằng:</h6>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="payment"
                      id="atm"
                      checked={paymentMethod === "atm"}
                      onChange={() => setPaymentMethod("atm")}
                    />
                    <label className="form-check-label" htmlFor="atm">
                      ATM &amp; Momo
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="payment"
                      id="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Thanh toán khi giao hàng
                    </label>
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal QR */}
      {showQRModal && (
        <QR
          orderId={orderId}
          amount={final}
          onClose={() => setShowQRModal(false)}
        />
      )}
      {/* Modal COD */}
      {showCODModal && (
        <COD
          onClose={() => setShowCODModal(false)}
          onConfirm={handleCODConfirm}
        />
      )}

      <Footer />
    </Fragment>
  );
};
export default Cart;
