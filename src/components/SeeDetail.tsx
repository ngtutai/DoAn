import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentSection from "../components/CommentSection";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  description?: string;
}

export default function SeeDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  // Sản phẩm
  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          toast.error("Không tìm thấy sản phẩm");
          return;
        }

        const folder =
          data.categoryId === 1
            ? "Cho"
            : data.categoryId === 2
            ? "Meo"
            : "PhuKien";

        setProduct({
          ...data,
          image: `/assets/images/${folder}/${data.image}`,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Lỗi tải chi tiết sản phẩm");
      });
  }, [id]);

  // Cuộn tới phần sản phẩm
  useEffect(() => {
    if (product) {
      const detailSection = document.getElementById("product-detail");
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      toast.warning("Vui lòng đăng nhập trước khi mua!");
      return;
    }

    if (!product) return;

    const userId = JSON.parse(storedUser).id;
    const cartKey = `cart_${userId}`;
    const storedCart = localStorage.getItem(cartKey);
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingIndex !== -1) {
      // Nếu sản phẩm đã có thì tăng số lượng
      cart[existingIndex].quantity += 1;
    } else {
      // Thêm mới
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        checked: true,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    // ✅ Thông báo
    toast.success("Đã thêm vào giỏ hàng!");

    // ✅ Cập nhật Header (gửi sự kiện)
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) return <p className="text-center mt-5">Đang tải...</p>;

  return (
    <Fragment>
      <Header />

      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("/assets/images/banner/banner-detail.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "630px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Chi tiết</h1>
        </div>
      </section>

      <section className="bread-crumb" id="product-detail">
        <div className="container">
          <div className="row">
            <div className="col-12 a-left">
              <ul className="breadcrumb">
                <li className="home">
                  <a href="/" className="nav-link text-muted">
                    <span>Trang chủ</span>
                  </a>
                </li>
                <li>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                  <span>Chi tiết</span>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                  <span className="fw-bold">{product.name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          {/* Ảnh sản phẩm */}
          <div className="col-md-5 mt-5">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ width: "50%" }}
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-7 text-start mt-3">
            <h2 className="fw-bold">{product.name}</h2>
            <h4 className="text-danger mt-3">
              {product.price.toLocaleString("vi-VN")}₫
            </h4>
            <hr />
            <p className="mt-3">
              {/* Mô tả */}
              {product.description || "Không có mô tả sản phẩm."}
            </p>

            <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-plus me-2"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Bình luận */}
        <div className="row mt-5">
          <div className="col-md-12">
            <CommentSection productId={product.id} />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
