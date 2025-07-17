import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Menu from "../components/Menu";
import AdminFooter from "../components/AdminFooter";
import axios from "axios";

interface Vouchers {
  id: number;
  code: string;
  percent: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
}

export default function Voucher() {
  const [vouchers, setVouchers] = useState<Vouchers[]>([]);
  const [newVoucher, setNewVoucher] = useState<Omit<Vouchers, "id">>({
    code: "",
    percent: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingVoucher, setEditingVoucher] = useState<Omit<
    Vouchers,
    "id"
  > | null>(null);

  const fetchVouchers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/vouchers");
      setVouchers(res.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách voucher!");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleAdd = async () => {
    const exists = vouchers.some((v) => v.code === newVoucher.code);
    if (!newVoucher.code || exists) {
      toast.error("Mã code bị trống hoặc đã tồn tại!");
      return;
    }

    try {
      await axios.post("http://localhost:3001/vouchers", newVoucher);
      toast.success("Thêm voucher thành công!");
      setNewVoucher({
        code: "",
        percent: 0,
        startDate: "",
        endDate: "",
        usageLimit: 0,
      });
      fetchVouchers();
    } catch (error) {
      toast.error("Lỗi khi thêm voucher!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/vouchers/${id}`);
      toast.success("Xoá voucher thành công!");
      fetchVouchers();
    } catch (error) {
      toast.error("Lỗi khi xoá voucher!");
    }
  };

  const handleEdit = (voucher: Vouchers) => {
    setEditingId(voucher.id);
    setEditingVoucher({
      code: voucher.code,
      percent: voucher.percent,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      usageLimit: voucher.usageLimit,
    });
  };

  const handleSave = async (id: number) => {
    if (!editingVoucher) return;
    const exists = vouchers.some(
      (v) => v.code === editingVoucher.code && v.id !== id
    );
    if (exists) {
      toast.error("Mã voucher đã tồn tại!");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/vouchers/${id}`, editingVoucher);
      toast.success("Cập nhật voucher thành công!");
      setEditingId(null);
      setEditingVoucher(null);
      fetchVouchers();
    } catch (error) {
      toast.error("Lỗi khi cập nhật voucher!");
    }
  };

  return (
    <div className="container-fluid bg-light text-start min-vh-100">
      <AdminHeader />
      <div className="row g-0">
        <div className="col-md-2 d-none d-md-block bg-secondary bg-opacity-10">
          <AdminSidebar />
        </div>
        <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3 text-center">
          {/* Phần thông tin cần làm */}
          <div className="container">
            <h2>Voucher Management</h2>

            {/* Add form */}
            <div className="row g-2 mb-3">
              {["code", "percent", "startDate", "endDate", "usageLimit"].map(
                (field) => (
                  <div className="col" key={field}>
                    <input
                      className="form-control"
                      type={
                        field === "percent" || field === "usageLimit"
                          ? "number"
                          : field === "startDate" || field === "endDate"
                          ? "date"
                          : "text"
                      }
                      placeholder={field}
                      value={(newVoucher as any)[field]}
                      onChange={(e) =>
                        setNewVoucher({
                          ...newVoucher,
                          [field]:
                            field === "percent" || field === "usageLimit"
                              ? Number(e.target.value)
                              : e.target.value,
                        })
                      }
                    />
                  </div>
                )
              )}
              <div className="col-auto">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </div>

            {/* Table */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Code</th>
                  <th style={{ width: "15%" }}>Percent</th>
                  <th style={{ width: "15%" }}>Start</th>
                  <th style={{ width: "15%" }}>End</th>
                  <th style={{ width: "15%" }}>Usage</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v) =>
                  editingId === v.id && editingVoucher ? (
                    <tr key={v.id}>
                      {[
                        "code",
                        "percent",
                        "startDate",
                        "endDate",
                        "usageLimit",
                      ].map((field) => (
                        <td key={field}>
                          <input
                            className="form-control"
                            type={
                              field === "percent" || field === "usageLimit"
                                ? "number"
                                : field === "startDate" || field === "endDate"
                                ? "date"
                                : "text"
                            }
                            value={(editingVoucher as any)[field]}
                            onChange={(e) =>
                              setEditingVoucher({
                                ...editingVoucher,
                                [field]:
                                  field === "percent" || field === "usageLimit"
                                    ? Number(e.target.value)
                                    : e.target.value,
                              })
                            }
                          />
                        </td>
                      ))}
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(v.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={v.id}>
                      <td>{v.code}</td>
                      <td>{v.percent}%</td>
                      <td>{v.startDate}</td>
                      <td>{v.endDate}</td>
                      <td>{v.usageLimit}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(v)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(v.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Menu />
      <AdminFooter />
    </div>
  );
}
