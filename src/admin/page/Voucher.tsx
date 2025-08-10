import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import voucherService, { Vouchers } from "../../services/voucherService";

function Voucher() {
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
      const data = await voucherService.list();
      const valid = data.filter((v) => v.usageLimit > 0);
      const toDelete = data.filter((v) => v.usageLimit <= 0);
      await Promise.all(toDelete.map((v) => voucherService.remove(v.id)));
      setVouchers(valid);
    } catch {
      toast.error("Không thể tải danh sách voucher");
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleAdd = async () => {
    if (!newVoucher.code.trim()) {
      toast.error("Vui lòng nhập mã voucher");
      return;
    }

    const exists = vouchers.some((v) => v.code === newVoucher.code);
    if (exists) {
      toast.error("Mã voucher đã tồn tại");
      return;
    }

    try {
      await voucherService.add(newVoucher);
      toast.success("Thêm voucher thành công");
      setNewVoucher({
        code: "",
        percent: 0,
        startDate: "",
        endDate: "",
        usageLimit: 0,
      });
      fetchVouchers();
    } catch {
      toast.error("Lỗi khi thêm voucher");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await voucherService.remove(id);
      toast.success("Đã xoá voucher");
      fetchVouchers();
    } catch {
      toast.error("Lỗi khi xoá voucher");
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
      toast.error("Mã voucher đã tồn tại");
      return;
    }

    try {
      await voucherService.update(id, editingVoucher);
      toast.success("Cập nhật thành công");
      setEditingId(null);
      setEditingVoucher(null);
      fetchVouchers();
    } catch {
      toast.error("Lỗi khi cập nhật voucher");
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-secondary text-start">Quản lý Voucher</h2>

        {/* Form thêm voucher */}
        <div className="row g-2 mb-3">
          {["code", "percent", "startDate", "endDate", "usageLimit"].map(
            (field) => (
              <div className="col" key={field}>
                <input
                  className="form-control"
                  type={
                    field === "percent" || field === "usageLimit"
                      ? "number"
                      : field.includes("Date")
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
              <i className="fa fa-plus me-2"></i>Thêm
            </button>
          </div>
        </div>

        {/* Bảng voucher */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Mã voucher</th>
              <th style={{ width: "15%" }}>Phần %</th>
              <th style={{ width: "15%" }}>Bắt đầu</th>
              <th style={{ width: "15%" }}>Kết thúc</th>
              <th style={{ width: "15%" }}>Số lượng</th>
              <th style={{ width: "15%" }}>Hành động</th>
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
                            : field.includes("Date")
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
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleSave(v.id)}
                    >
                      <i className="fa fa-save me-1"></i>Lưu
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => setEditingId(null)}
                    >
                      <i className="fa fa-times me-1"></i>Huỷ
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
                      className="btn btn-outline-info btn-sm me-2"
                      onClick={() => handleEdit(v)}
                    >
                      <i className="fa fa-edit me-1"></i>Sửa
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(v.id)}
                    >
                      <i className="fa fa-trash me-1"></i>Xoá
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Voucher;
