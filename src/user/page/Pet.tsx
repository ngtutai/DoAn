// Pet ( Thú cưng )
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export interface Product {
  id: number;
  name: string;
  type: "dog" | "cat" | "accessory";
  price: number;
  image: string;
}

type CartItem = Product & {
  quantity: number;
  checked: boolean;
};

const itemsPerPage = 8;

function formatCurrency(value: number): string {
  return value.toLocaleString("vi-VN") + " đ";
}

export default function Pet() {
  const [selectedType, setSelectedType] = useState<
    "all" | "dog" | "cat" | "accessory"
  >("all");
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  // điều chỉnh giá
  const [priceOptions, setPriceOptions] = useState<
    { label: string; min: number; max: number }[]
  >([]);
  useEffect(() => {
    fetch("./data/priceRanges.json")
      .then((res) => res.json())
      .then((data) => setPriceOptions(data))
      .catch((err) => console.error("Lỗi tải dải giá:", err));
  }, []);

  // ✅ Load dữ liệu từ JSON Server và chuyển đổi categoryId → type
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped: Product[] = data.map((item: any) => {
          let type: "dog" | "cat" | "accessory" = "accessory";
          let folder = "PhuKien";
          if (item.categoryId === 1) {
            type = "dog";
            folder = "Cho";
          } else if (item.categoryId === 2) {
            type = "cat";
            folder = "Meo";
          }

          return {
            id: item.id,
            name: item.name,
            price: item.price,
            image: `/assets/images/${folder}/${item.image}`, // lấy đúng đường dẫn ảnh
            type,
          };
        });
        setProducts(mapped);
      })
      .catch((err) => console.error("Lỗi tải dữ liệu sản phẩm:", err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu trang (ví dụ đổi trang)
    document.getElementById("section-pet")?.scrollIntoView(); // cuộn đến một khu vực cụ thể
  }, [currentPage]);

  // Thêm sản phẩm từ Pet vào Giỏ
  const addToCart = (product: Product) => {
    const storedUser = localStorage.getItem("currentUser");

    // Kiểm tra nếu chưa đăng nhập
    if (!storedUser) {
      toast.warning("Vui lòng đăng nhập trước khi mua!");
      return;
    }

    const userId = JSON.parse(storedUser).id;
    const cartKey = `cart_${userId}`;

    const cartRaw = localStorage.getItem(cartKey);
    const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, checked: true });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    toast.success("Đã thêm vào giỏ hàng!");
  };

  // Danh mục
  const handleTypeChange = (type: "all" | "dog" | "cat" | "accessory") => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePriceChange = (index: number) => {
    setSelectedPriceIndex(index);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((p) => {
    const matchType = selectedType === "all" || p.type === selectedType;
    const matchPrice =
      selectedPriceIndex === -1 ||
      (p.price >= priceOptions[selectedPriceIndex].min &&
        p.price <= priceOptions[selectedPriceIndex].max);

    const keyword = searchKeyword.trim().toLowerCase();

    const matchKeyword =
      keyword === "" ||
      p.name.toLowerCase().includes(keyword) ||
      p.id.toString().includes(keyword); // Tìm theo ID

    return matchType && matchPrice && matchKeyword;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-pet.png")`,
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
          <h1 className="display-4 fw-bold mb-0">Thú cưng</h1>
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
                  <span className="text-danger">Thú cưng</span>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phần cần làm cho bài */}
      <div className="container-fluid py-4" id="section-pet">
        <div className="row">
          {/* Danh mục sản phẩm Left */}
          <div className="col-3 pt-3 border-end border-1 border-dark">
            <div className="mb-3 fw-bold text-dark">
              <h6>
                <i className="fa-solid fa-table-list me-2"></i>Danh mục sản phẩm
              </h6>
            </div>
            <hr />
            <ul className="list-unstyled text-start ps-4 fs-5">
              <li className="mb-2">
                <button
                  className={`btn btn-link p-0 text-start text-decoration-none ${
                    selectedType === "all"
                      ? "fw-bold text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => handleTypeChange("all")}
                >
                  <span>
                    <h5>
                      <i className="fa-solid fa-border-all me-2"></i> Tất cả
                    </h5>
                  </span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`btn btn-link p-0 text-start text-decoration-none ${
                    selectedType === "dog"
                      ? "fw-bold text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => handleTypeChange("dog")}
                >
                  <span>
                    <h5>
                      <i className="fa-solid fa-dog me-2"></i>Chó
                    </h5>
                  </span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`btn btn-link p-0 text-start text-decoration-none ${
                    selectedType === "cat"
                      ? "fw-bold text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => handleTypeChange("cat")}
                >
                  <span>
                    <h5>
                      <i className="fa-solid fa-cat me-2"></i>Mèo
                    </h5>
                  </span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`btn btn-link p-0 text-start text-decoration-none ${
                    selectedType === "accessory"
                      ? "fw-bold text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => handleTypeChange("accessory")}
                >
                  <span>
                    <h5>
                      <i className="fa-solid fa-hat-wizard me-2"></i>Phụ kiện
                    </h5>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="col-9">
            <div className="row align-items-center">
              {/* Breadcrumbs */}
              <div className="col-md-6 text-dark text-start fw-bold">
                <a href="/" className="text-muted text-decoration-none">
                  Home
                </a>{" "}
                / Thú cưng /{" "}
                {selectedType === "all"
                  ? "Tất cả"
                  : selectedType === "cat"
                  ? "Mèo"
                  : selectedType === "dog"
                  ? "Chó"
                  : "Phụ kiện"}
              </div>

              {/* Tìm kiếm bằng cách nhập */}
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm theo tên sản phẩm..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              {/* Tìm kiếm bằng giá */}
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={selectedPriceIndex}
                  onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                >
                  <option value={-1}>Giá</option>
                  {priceOptions.map((opt, index) => (
                    <option key={index} value={index}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr />

            {/* Danh sách sản phẩm */}
            <div className="row g-4">
              {/* phần hiển sản phẩm tất cả thì có bào nhiêu sản phẩm trong tất cả */}
              <div className="text-muted text-end mb-2">
                Hiện có <strong>{filteredProducts.length}</strong> sản phẩm
                {selectedType !== "all" && (
                  <>
                    {" "}
                    ở mục{" "}
                    <strong>
                      {selectedType === "dog"
                        ? "Chó"
                        : selectedType === "cat"
                        ? "Mèo"
                        : "Phụ kiện"}
                    </strong>
                  </>
                )}
              </div>

              {paginatedProducts.map((product) => (
                <div className="col-10 col-sm-6 col-md-3" key={product.id}>
                  <div className="product-card border p-3 text-center shadow-sm rounded-3 position-relative bg-white">
                    <span
                      className="badge bg-warning text-dark position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 10 }}
                    >
                      ID: {product.id}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid mb-3 rounded"
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                      }}
                    />
                    <h6
                      className="fw-bold text-start mb-1 p-1"
                      style={{ fontFamily: "'Fredoka', cursive" }}
                    >
                      {product.name}
                    </h6>
                    <p className="text-start text-muted mb-3 p-1">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        title="Thêm vào giỏ hàng"
                        className="btn btn-primary btn-sm px-3 py-2"
                        onClick={() => addToCart(product)}
                      >
                        <i className="fas fa-shopping-cart me-1"></i> Thêm vào
                      </button>
                      <button
                        title="Xem chi tiết"
                        className="btn btn-outline-secondary btn-sm px-3 py-2"
                        onClick={() => navigate(`/detail/${product.id}`)}
                      >
                        <i className="fas fa-search me-1"></i> Xem
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {paginatedProducts.length === 0 && (
                <p className="text-center text-danger">
                  Không có sản phẩm phù hợp.
                </p>
              )}
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Trước
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Tiếp
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
