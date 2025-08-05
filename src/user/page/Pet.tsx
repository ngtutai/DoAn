// Pet ( Thú cưng )
import React, { Fragment, useState, useEffect } from "react";
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
    <Fragment>
      <link
        rel="stylesheet"
        href="assets/plugins/font-awesome/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="assets/plugins/bootstrap/css/bootstrap.min.css"
      />
      <Header />

      {/* BANNER */}
      <section
        className="banner-area banner-area2 text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("assets/images/banner/banner-pet.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
          height: "auto",
        }}
       >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-6 display-md-4 fw-bold mb-0">Thú cưng</h1>
          <div className="col-12 mt-2">
            <ul className="breadcrumb justify-content-center justify-content-md-start">
              <li className="home">
                <a href="/" className="nav-link text-muted fw-bold">
                  Trang chủ
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
                <span className="text-danger fw-bold">Thú cưng</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PHẦN CHÍNH */}
      <div className="container-fluid py-4 px-3 px-md-5" id="section-pet">
        <div className="row">
          {/* Danh mục bên trái */}
          <div className="col-12 col-md-3 pt-3 pe-md-4 border-end mb-4 mb-md-0">
            <h6 className="fw-bold text-dark">
              <i className="fa-solid fa-table-list me-2"></i>Danh mục sản phẩm
            </h6>
            <hr />
            <ul className="list-unstyled ps-3 fs-6">
              {[
                { label: "Tất cả", value: "all", icon: "fa-border-all" },
                { label: "Chó", value: "dog", icon: "fa-dog" },
                { label: "Mèo", value: "cat", icon: "fa-cat" },
                {
                  label: "Phụ kiện",
                  value: "accessory",
                  icon: "fa-hat-wizard",
                },
              ].map((item) => (
                <li className="mb-2" key={item.value}>
                  <button
                    className={`btn btn-link p-0 text-start text-decoration-none ${
                      selectedType === item.value
                        ? "fw-bold text-primary"
                        : "text-muted"
                    }`}
                    onClick={() => handleTypeChange(item.value as any)}
                  >
                    <h6>
                      <i className={`fa-solid ${item.icon} me-2`}></i>
                      {item.label}
                    </h6>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nội dung bên phải */}
          <div className="col-12 col-md-9">
            <div className="row align-items-center mb-3">
              <div className="col-12 col-md-6 text-center text-md-start fw-bold mb-2 mb-md-0">
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

              <div className="col-12 col-sm-6 col-md-3 mt-2 mt-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm theo tên..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>

              <div className="col-12 col-sm-6 col-md-3 mt-2 mt-md-0">
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

            <div className="row g-4">
              <div className="text-muted text-end">
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
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <div className="product-card border p-3 text-center h-100 d-flex flex-column justify-content-between">
                    <div>
                      <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                        ID: {product.id}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid mb-2"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h6 className="mt-3">{product.name}</h6>
                    <p className="text-muted">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="product-actions d-flex justify-content-center gap-2 mt-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        title="Thêm vào giỏ hàng"
                        onClick={() => addToCart(product)}
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        title="Xem chi tiết"
                        onClick={() => navigate(`/detail/${product.id}`)}
                      >
                        <i className="fas fa-search"></i>
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

            {/* PHÂN TRANG */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination flex-wrap justify-content-center">
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
    </Fragment>
  );
}
