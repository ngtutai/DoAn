import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-contact.png")`,
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
          <h1 className="display-4 fw-bold mb-0">Liên hệ</h1>
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
                  <span className="text-danger">Liên hệ</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phần cần làm vào bài */}
      <div className="contact-banner text-start">
        <img
          src="assets/images/banner/support-contact-2.png"
          alt="Ảnh liên hệ"
        />
        <form className="contact-form-overlay">
          <div className="col-10 mb-3">
            <h2>Bạn cần hỗ trợ?</h2>
            <p style={{ fontSize: "15 px" }}>
              Celah rất hân hạnh được hỗ trợ bạn, hãy để lại thông tin cho chúng
              tôi nhé. Yêu cầu của bạn sẽ được xử lý và phản hồi trong thời gian
              sớm nhất.
            </p>
          </div>
          <div className="row g-3 mt-1">
            <div className="col-6">
              <label htmlFor="name">Họ tên*</label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                placeholder="Tên đầy đủ"
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Email"
                required
              />
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="message">Tin nhắn*</label>
              <textarea
                id="message"
                className="form-control form-control-lg"
                rows={3}
                placeholder="Nội dung tin nhắn"
                required
                defaultValue={""}
              />
            </div>
            <div className="col-12 mt-4 text-start">
              <button className="btn btn-dark fw-bold" style={{ width: "20%" }}>
                Gửi
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container">
        {/* Thông tin liên hệ & Bản đồ */}
        <div className="mt-3">
          <div className="row">
            <div className="col-md-5">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d106.7000000!3d10.7760000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f123456789%3A0x987654321!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqjbjEgVFAuIEjDoCBDaMOtIE1pbmggQ2l0eQ!5e0!3m2!1svi!2s!4v1710000000000"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Celah Vietnam Location Map"
                />
              </div>
            </div>
            <div className="col-md-3 mt-4">
              <img
                src="assets/images/iconlogo/icon-map.png"
                style={{ width: "80%" }}
                alt=""
              />
            </div>
            <div className="col-md-4 mb-3 mt-4 text-start">
              <h4 className="text-dark">Địa chỉ của chúng tôi</h4>
              <p className="mb-1">
                <strong>
                  <i className="fa-solid fa-building me-2" /> :{""}
                </strong>{" "}
                Celah Vietnam
              </p>
              <p className="mb-1">
                <strong>
                  <i className="fa-solid fa-location-dot me-2" /> :{""}
                </strong>{" "}
                123 Đường ABC, Quận 100, TP.HCM
              </p>
              <p className="mb-1">
                <strong>
                  <i className="fa-solid fa-envelope me-1" /> : {""}
                </strong>
                lienhe@petshop.vn
              </p>
              <p>
                <strong>
                  <i className="fa-solid fa-phone me-1" /> :{""}
                </strong>{" "}
                0987 123 321
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
