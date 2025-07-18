import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Information() {
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
          height: "500px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.13)",
            padding: "20px 40px",
            borderRadius: "8px",
          }}
        >
          <h1 className="display-4 fw-bold mb-0">Thú cưng</h1>
        </div>
      </section>

      <section className="bread-crumb">
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
                  <strong>
                    <span>Thông tin</span>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Phầm cầm làm */}
      <Footer />
    </>
  );
}
