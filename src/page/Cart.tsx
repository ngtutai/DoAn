import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  checked: boolean;
}

const vouchers: Record<string, number> = {
  kun: 50,
};

const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherPercent, setVoucherPercent] = useState(0);
  const [voucherCode, setVoucherCode] = useState("Chưa áp dụng");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherValid, setVoucherValid] = useState<boolean | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"atm" | "cod">("atm");
  const [showQRModal, setShowQRModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [showCODModal, setShowCODModal] = useState(false);

  // Load cart từ localStorage khi trang Cart mở
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
  }, []);

  // Khi cập nhật cart
  const updateCart = (newItems: CartItem[]) => {
    const storedUser = localStorage.getItem("currentUser");
    const userId = storedUser ? JSON.parse(storedUser).id : null;
    const cartKey = userId ? `cart_${userId}` : "cart";

    setItems(newItems);
    localStorage.setItem(cartKey, JSON.stringify(newItems));
  };

  const total = items.reduce(
    (sum, i) => (i.checked ? sum + i.price * i.quantity : sum),
    0
  );
  const final = total - (total * voucherPercent) / 100;

  // Voucher
  const applyVoucher = () => {
    const code = voucherInput.trim();
    const percent = vouchers[code];

    if (!code) {
      setVoucherMessage("Vui lòng nhập mã giảm giá");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
    } else if (percent) {
      setVoucherPercent(percent);
      setVoucherCode(code);
      setVoucherMessage(`Đã áp dụng mã ${code} giảm ${percent}%`);
      setVoucherValid(true);
    } else {
      setVoucherMessage("Mã giảm giá không hợp lệ");
      setVoucherValid(false);
      setVoucherPercent(0);
      setVoucherCode("Chưa áp dụng");
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

  // Hàm Delete
  const handleDelete = (i: number) => {
    const updated = items.filter((_, idx) => idx !== i);
    updateCart(updated);
  };

  // Hàm thanh toán (chưa chọn sản phẩm) & (quét mã QR)
  const handlePayment = () => {
    if (total === 0) return toast.warning("Bạn chưa chọn sản phẩm nào.");

    if (paymentMethod === "atm") {
      const id = "demo_" + Date.now();
      setOrderId(id);
      setShowQRModal(true);

      const interval = setInterval(() => {
        if (localStorage.getItem("orderStatus_" + id) === "paid") {
          clearInterval(interval);
          toast.success("Thanh toán thành công!");
          setShowQRModal(false);
          const updated = items.filter((item) => !item.checked);
          updateCart(updated);
          setIsPaid(true);
        }
      }, 2000);
    } else {
      setShowCODModal(true);
    }
  };

  // Hàm thanh toán (bằng tiền mặt khi giao hàng)

  // ==== UI ====
  return (
    <Fragment>
      <Header />
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-cart.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "630px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Giỏ hàng</h1>
        </div>
      </section>

      <div className="container-fluid text-start">
        <div className="row p-2 mt-2">
          {/* Left Sidebar */}
          <div className="col-12 col-md-8 mb-3">
            <h5>
              <a href="/" className="text-muted text-decoration-none">
                Trang chủ
              </a>{" "}
              / Giỏ hàng
            </h5>
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
                            alt=""
                            style={{
                              width: "50%",
                              height: "50%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
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
                    <i className="fa-solid fa-car-side me-1"></i>
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

      <Footer />
    </Fragment>
  );
};
export default Cart;
