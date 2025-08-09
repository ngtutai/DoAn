import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Service() {
  const services = [
    {
      id: "spa",
      title: "Cắt tỉa & Spa",
      desc: "Dịch vụ làm đẹp, vệ sinh, cắt tỉa lông, tắm gội và chăm sóc bộ lông giúp thú cưng luôn sạch sẽ và thơm tho.",
      image: "/assets/images/DichVu/mot.png",
    },
    {
      id: "health",
      title: "Khám sức khỏe",
      desc: "Khám định kỳ, tiêm phòng, tư vấn dinh dưỡng và điều trị bởi bác sĩ thú y chuyên nghiệp.",
      image: "/assets/images/DichVu/hai.png",
    },
    {
      id: "hotel",
      title: "Khách sạn thú cưng",
      desc: "Không gian nghỉ dưỡng tiện nghi, chăm sóc tận tình cho thú cưng khi bạn vắng nhà.",
      image: "/assets/images/DichVu/ba.png",
    },
    {
      id: "training",
      title: "Huấn luyện cơ bản",
      desc: "Đào tạo các kỹ năng cơ bản như đi vệ sinh đúng chỗ, nghe lệnh, ngồi, bắt tay... phù hợp với từng độ tuổi.",
      image: "/assets/images/DichVu/bon.png",
    },
    {
      id: "post-surgery",
      title: "Chăm sóc hậu phẫu",
      desc: "Dịch vụ chăm sóc đặc biệt sau phẫu thuật, đảm bảo hồi phục nhanh chóng và an toàn cho thú cưng.",
      image: "/assets/images/DichVu/nam.png",
    },
    {
      id: "nutrition",
      title: "Tư vấn dinh dưỡng",
      desc: "Tư vấn thực đơn phù hợp với độ tuổi, giống loài, và tình trạng sức khỏe của thú cưng.",
      image: "/assets/images/DichVu/sau.png",
    },
    {
      id: "photo",
      title: "Chụp ảnh thú cưng",
      desc: "Dịch vụ studio mini giúp bạn lưu lại những khoảnh khắc đáng yêu của thú cưng.",
      image: "/assets/images/DichVu/bay.png",
    },
    {
      id: "delivery",
      title: "Giao hàng phụ kiện",
      desc: "Giao tận nơi thức ăn, đồ chơi, quần áo và phụ kiện cho thú cưng toàn quốc.",
      image: "/assets/images/DichVu/tam.png",
    },
  ];

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300); // đảm bảo phần tử được render trước
      }
    }
  }, [location]);

  return (
    <>
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-service.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "550px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Dịch vụ</h1>
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
                  <span className="text-danger">Dịch vụ</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Các dịch vụ của chúng tôi</h2>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3 mb-4" key={index} id={service.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Service;
