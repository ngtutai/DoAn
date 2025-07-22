import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Product {
  id: string; // 🔄
  name: string;
  price: number;
  image: string;
  categoryId: number;
  description: string;
}

export default function Information() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((r) => r.json())
      .then((d) =>
        setProducts(
          d.sort((a: Product, b: Product) => a.name.localeCompare(b.name, "vi"))
        )
      )
      .catch((e) => console.error(e));
  }, []);

  const getImage = (p: Product) =>
    p.categoryId === 1
      ? `/assets/images/Cho/${p.image}`
      : p.categoryId === 2
      ? `/assets/images/Meo/${p.image}`
      : `/assets/images/PhuKien/${p.image}`;

  const product = id ? products.find((p) => p.id === id) : undefined;

  /* ---------- RENDER ---------- */
  return (
    <>
      <Header />

      {/* BANNER */}
      <section
        className="banner-area banner-area2 d-flex align-items-center justify-content-center text-white text-center"
        style={{
          background:
            'url("/assets/images/banner/banner-pet.png") center / cover',
          height: 500,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,.13)",
            padding: "20px 40px",
            borderRadius: 8,
          }}
        >
          <h1 className="display-4 fw-bold mb-0">
            {id ? "Chi tiết thú cưng" : "Thông tin thú cưng"}
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <section className="bread-crumb">
        <div className="container">
          <ul className="breadcrumb m-0 py-3">
            <li>
              <a href="/" className="nav-link text-muted">
                Trang chủ
              </a>
            </li>
            <li className="px-1">/</li>
            <li>
              <a href="/information" className="nav-link text-muted d-inline">
                Thông tin
              </a>
            </li>
            {id && (
              <>
                <li className="px-1">/</li>
                <li>
                  <strong>{id}</strong>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-4">
        <div className="container">
          {id ? (
            product ? (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <img
                    src={getImage(product)}
                    alt={product.name}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: 400, objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6">
                  <h2>{product.name}</h2>
                  <p className="text-danger fw-bold">
                    {product.price.toLocaleString()}đ
                  </p>
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {product.description}
                  </pre>
                  <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => navigate("/information")}
                  >
                    ← Quay lại danh sách
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted">Không tìm thấy sản phẩm.</p>
            )
          ) : (
            <>
              {/* SEARCH */}
              <div className="mb-4 text-center">
                <input
                  type="text"
                  className="form-control w-50 mx-auto"
                  placeholder="Tìm kiếm theo tên hoặc ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* LIST */}
              <div className="row">
                {products
                  .filter((p) =>
                    [p.name, p.id].some((v) =>
                      v.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((p) => (
                    <div key={p.id} className="col-md-4 mb-4">
                      <div
                        className="card h-100 shadow-sm cursor-pointer"
                        role="button"
                        onClick={() => navigate(`/information/${p.id}`)}
                      >
                        <img
                          src={getImage(p)}
                          alt={p.name}
                          className="card-img-top"
                          style={{ height: 250, objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="text-danger fw-bold mb-2">
                            {p.price.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                {!products.length && (
                  <p className="text-center text-muted">Đang tải...</p>
                )}
                {products.length &&
                  !products.some((p) =>
                    [p.name, p.id].some((v) =>
                      v.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  ) && (
                    <p className="text-center text-muted">
                      Không tìm thấy kết quả.
                    </p>
                  )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
