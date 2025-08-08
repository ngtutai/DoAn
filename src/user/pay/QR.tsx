import React, { useEffect, useState } from "react";

export interface Props {
  orderId: string;
  amount: number;
  onClose: () => void;
}

const QR: React.FC<Props> = ({ orderId, amount, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(90); // 90 giây

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const qrLink = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    window.location.origin + "/payment.html?orderId=" + orderId
  )}`;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "600px", width: "95%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content p-4">
          <h5 className="text-center mb-3">Thông tin chuyển khoản</h5>
          <div className="row align-items-center">
            {/* Left: Thông tin */}
            <div className="col-12 col-md-6 mb-3 mb-md-0 text-start">
              <p>
                <strong>Ngân hàng:</strong> Vietcombank
              </p>
              <p>
                <strong>Số tài khoản:</strong> 1234 5678 9999
              </p>
              <p>
                <strong>Chủ tài khoản:</strong> Nguyễn Văn A
              </p>
              <p>
                <strong>Nội dung chuyển khoản:</strong> {orderId}
              </p>
              <p>
                <strong>Số tiền:</strong>{" "}
                <span className="text-danger">
                  {amount.toLocaleString("vi-VN")}đ
                </span>
              </p>
              <p className="text-muted small mt-2">
                Vui lòng chuyển khoản đúng nội dung. Sau đó bấm "Tôi đã thanh
                toán" trên điện thoại.
              </p>
            </div>

            {/* Right: Mã QR */}
            <div className="col-12 col-md-6 text-center">
              {timeLeft > 0 ? (
                <>
                  <img
                    src={qrLink}
                    alt="QR"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <p className="mt-2 text-muted">
                    ⏳ Thời gian còn lại:{" "}
                    <strong>
                      {minutes}:{seconds.toString().padStart(2, "0")}
                    </strong>
                  </p>
                </>
              ) : (
                <p className="text-danger fw-bold mt-4">
                  ⛔ Mã QR đã hết hạn, vui lòng tạo lại.
                </p>
              )}
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
      {/* Bên phải: hình điện thoại + mã QR */}
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div
          style={{
            width: "300px",
            height: "600px",
            border: "16px solid black",
            borderRadius: "36px",
            padding: "20px",
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              width: "260px",
              height: "260px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/qr-example.png" // hoặc QR được render từ API
              alt="QR Code"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <p className="text-center mt-4">Quét mã để thanh toán</p>
        </div>
      </div>
    </div>
  );
};

export default QR;
