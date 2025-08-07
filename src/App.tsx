// ========== Hàm chung ========== //
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
// ========== Link Web User ========== //
import Home from "./user/page/Home";
import Pet from "./user/page/Pet";
import Detail from "./user/components/Detail";
import Service from "./user/page/Service";
import Contact from "./user/page/Contact";
import TeamPage from "./user/page/TeamPage";
import Cart from "./user/page/Cart";
import Login from "./user/auth/Login";
import Register from "./user/auth/Register";
import Profile from "./user/page/Profile";
import ChangePassword from "./user/page/ChangePassword";
import Order from "./user/page/Order";
import HistoryOrder from "./user/page/HistoryOrder";

// ========== Link Web Admin ========== //
import AdminLayout from "./admin/Layout/AdminLayout";
import AdminPrivateRoute from "./admin/Layout/AdminPrivateRoute";
import AdminLogin from "./admin/auth/AdminLogin";
import Dashboard from "./admin/page/Dashboard";
import OrderList from "./admin/Orders/OrderList";
import EditOrder from "./admin/Orders/EditOrder";
import ProductList from "./admin/Products/PetList";
import EditProduct from "./admin/Products/EditPet";
import SliderList from "./admin/Sliders/SliderList";
import EditSlider from "./admin/Sliders/EditSlider";
import HistoryList from "./admin/page/HistoryList";
import Account from "./admin/page/Account";
import Voucher from "./admin/page/Voucher";
import CommentList from "./admin/page/CommentList";
import AdminProfile from "./admin/page/AdminProfile";

// ========== Link Lỗi Error ========== //
import NotFound from "./user/components/NotFound";
import AdminUserManagement from "./admin/page/AdminUserManagement";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* ========== Link Web User ========== */}
          <Route path="" element={<Home />} />
          <Route path="pet" element={<Pet />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="service" element={<Service />} />
          <Route path="contact" element={<Contact />} />
          <Route path="teampage" element={<TeamPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="orders" element={<Order />} />
          <Route path="historyorder" element={<HistoryOrder />} />
          {/* ========== Link Web Admin ========== */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* ✅ Trang login KHÔNG cần bảo vệ */}
            <Route index element={<AdminLogin />} />

            {/* ✅ Trang được bảo vệ CẦN đăng nhập */}
            <Route
              element={
                <AdminPrivateRoute>
                  <Outlet />
                </AdminPrivateRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="order" element={<OrderList />} />
              <Route path="order/:id" element={<EditOrder />} />
              <Route path="product" element={<ProductList />} />
              <Route path="product/new" element={<EditProduct />} />
              <Route path="product/edit/:id" element={<EditProduct />} />
              <Route path="slider" element={<SliderList />} />
              <Route path="slider/new" element={<EditSlider />} />
              <Route path="slider/edit/:id" element={<EditSlider />} />
              <Route path="history" element={<HistoryList />} />
              <Route path="account" element={<Account />} />
              <Route path="voucher" element={<Voucher />} />
              <Route path="comment" element={<CommentList />} />
              <Route path="adminprofile" element={<AdminProfile />} />
              <Route path="mana" element={<AdminUserManagement />} />
            </Route>
          </Route>
          {/* ========== Link Error ========== */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* 🔔 Toast hiển thị toàn cục */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        pauseOnHover
        closeOnClick
        draggable
        theme="colored"
      />
    </div>
  );
}
