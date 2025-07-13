import React, { Fragment } from "react";
import Slider from "./Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Fragment>
      <Header />
      {/* Sliders */}
      <Slider />

      {/* băng rôn chào mừng */}
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-12 mx-auto">
            <div className="marquee-container">
              <div className="marquee-text">
                <h3 className="p-2">
                  🎉 Chào mừng đến với ngôi nhà của Boss – nơi yêu thương bắt
                  đầu! 🎉
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dịch vụ */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center">
            {[
              {
                icon: "fa-truck-fast",
                title: "Ship toàn quốc",
                desc: "Giao hàng nhanh chóng đến 63 tỉnh thành.",
              },
              {
                icon: "fa-rotate",
                title: "Đổi hàng linh động",
                desc: "Đổi trả dễ dàng trong 7 ngày nếu lỗi từ nhà cung cấp.",
              },
              {
                icon: "fa-cart-shopping",
                title: "Đặt hàng trực tiếp",
                desc: "Đặt online nhanh chóng chỉ với vài bước đơn giản.",
              },
              {
                icon: "fa-phone-volume",
                title: "Hotline hỗ trợ",
                desc: "Tư vấn miễn phí: 1900 123 456",
              },
            ].map((item, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="cloud-box p-4 h-100 position-relative">
                  <div className="circle-icon mb-3 mx-auto">
                    <i className={`fa-solid ${item.icon} fa-2x`}></i>
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
