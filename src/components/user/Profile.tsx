import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

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
                    <span>Liên hệ</span>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <h3 className="mb-4">Thông tin tài khoản</h3>
        <table className="table table-bordered text-start">
          <tbody>
            <tr>
              <th className="col-2" scope="row">
                Tên hiển thị
              </th>
              <td className="col-2">{user.displayname}</td>
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
      <Footer />
    </>
  );
}
