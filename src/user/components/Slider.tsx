import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function Slide() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/sliders")
      .then((res) => res.json())
      .then((data) => setSliders(data))
      .catch(() => console.error("Lỗi tải slider"));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliders]);

  if (sliders.length === 0)
    return <h4 className="mt-3">Hiện không có slider nào ...</h4>;

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % sliders.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div
      className="position-relative overflow-hidden mx-5 mt-2"
      style={{ height: "550px" }}
    >
      {sliders.map((item, index) => (
        <div
          key={item.id}
          className="position-absolute w-100 h-100 text-white d-flex flex-column justify-content-center align-items-start px-3 px-md-5"
          style={{
            backgroundImage: `url("/assets/images/slider/${item.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === current ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          {/* Phần mô tả */}
          <h2 className="bg-dark bg-opacity-50 px-3 py-2 rounded-pill mb-2">
            {item.title}
          </h2>
          <p className="bg-dark bg-opacity-50 px-3 py-2 rounded mb-3 w-50 w-md-100">
            {item.description}
          </p>
          <button
            className="btn btn-danger rounded-pill px-4 text-warning"
            onClick={() => navigate("/pet#section-pet")}
          >
            Xem thêm<i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      ))}

      {/* Nút chuyển slider - ẩn trên mobile nếu muốn */}
      <button
        onClick={goToPrev}
        className="btn btn-dark position-absolute top-50 start-0 translate-middle-y px-3 d-none d-md-block"
        style={{ zIndex: 2 }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        onClick={goToNext}
        className="btn btn-dark position-absolute top-50 end-0 translate-middle-y px-3 d-none d-md-block"
        style={{ zIndex: 2 }}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
        {sliders.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === current ? "#0073ffff" : "#ccc",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
