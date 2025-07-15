import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

export interface User {
  id: number;
  displayname: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <h3 className="text-danger">Bạn chưa đăng nhập!</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
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
                        <span>Thông tin tài khoản</span>
                      </strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Sidebar />

          {/* Phần chỉnh sửa */}
          <div className="col-md-9">
            <table className="table table-bordered text-start mt-5">
              <tbody>
                <tr>
                  <th className="col-2" scope="row">
                    Tên hiển thị
                  </th>
                  <td className="col-5">{user.displayname}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope="row">Số điện thoại</th>
                  <td>{user.phone || "Chưa cập nhật"}</td>
                </tr>
                <tr>
                  <th scope="row">Địa chỉ</th>
                  <td>{user.address || "Chưa cập nhật"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
