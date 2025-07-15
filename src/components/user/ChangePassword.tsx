import React, { Fragment } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export default function ChangePassword() {
  return (
    <Fragment>
      <Header />
      <div className="container py-2">
        <div className="row">
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
                        <span>Đổi mật khẩu</span>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Sidebar />

          {/* Phần chỉnh sửa */}
          <div className="col-md-9"></div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
