import React, { Fragment } from "react";
import Slider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
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
  ];

  const featuredServices = [
    {
      id: "spa",
      title: "Cắt tỉa & Spa",
      desc: "Làm đẹp, vệ sinh toàn diện cho thú cưng.",
      image: "/assets/images/DichVu/mot.png",
    },
    {
      id: "health",
      title: "Khám sức khỏe",
      desc: "Bác sĩ thú y kiểm tra định kỳ, đảm bảo sức khỏe.",
      image: "/assets/images/DichVu/hai.png",
    },
    {
      id: "hotel",
      title: "Khách sạn thú cưng",
      desc: "Chăm sóc khi bạn đi vắng, an toàn & chu đáo.",
      image: "/assets/images/DichVu/ba.png",
    },
    {
      id: "training",
      title: "Huấn luyện cơ bản",
      desc: "Dạy ngồi, bắt tay, đi vệ sinh đúng chỗ...",
      image: "/assets/images/DichVu/bon.png",
    },
  ];

  return (
    <Fragment>
      <Header />
      <Slider />

      <div className="container mt-2 mb-2">
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

      <div className="card shadow-sm p-4 border-0">
        {/* Chính sách */}
        <section className="bg-light py-3 rounded mb-4">
          <div className="container">
            <div className="row text-center">
              {services.map((item, index) => (
                <div className="col-md-3 mb-3" key={index}>
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

        {/* Dịch vụ nổi bật */}
        <section className="bg-light py-3 rounded mb-4">
          <div className="container">
            <h3 className="text-center fw-bold mb-4">✨ Dịch vụ nổi bật</h3>
            <div className="row">
              {featuredServices.map((item, i) => (
                <div className="col-md-3 mb-4" key={i}>
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.title}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text small">{item.desc}</p>
                      <Link
                        to={`/service#${item.id}`}
                        className="btn btn-sm btn-outline-danger mt-auto"
                      >
                        Tìm hiểu thêm
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cam kết */}
        <section className="bg-warning bg-opacity-25 py-4 rounded text-center">
          <div className="container">
            <h4 className="fw-bold mb-3">🎯 Cam kết của PET SHOP</h4>
            <div className="row">
              <div className="col-md-3 mb-3">
                <i className="fa-solid fa-heart fa-2x text-danger mb-2"></i>
                <p className="mb-0">Yêu thương và chăm sóc như gia đình</p>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fa-solid fa-user-doctor fa-2x text-primary mb-2"></i>
                <p className="mb-0">Bác sĩ thú y tận tâm, chuyên nghiệp</p>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fa-solid fa-shield-dog fa-2x text-success mb-2"></i>
                <p className="mb-0">100% thú cưng đã tiêm phòng</p>
              </div>
              <div className="col-md-3 mb-3">
                <i className="fa-solid fa-leaf fa-2x text-success mb-2"></i>
                <p className="mb-0">Sản phẩm thân thiện với môi trường</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </Fragment>
  );
}
