import React, { useState } from "react";

interface Props {
  onClose: () => void;
  onConfirm: (address: string) => void;
}

const provinces: Record<string, string[]> = {
  "TP. Hồ Chí Minh": [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Tân Bình",
    "Quận Bình Thạnh",
    "Quận Phú Nhuận",
    "Thủ Đức",
    "Hóc Môn",
    "Củ Chi",
  ],
  "Hà Nội": [
    "Ba Đình",
    "Hoàn Kiếm",
    "Cầu Giấy",
    "Thanh Xuân",
    "Đống Đa",
    "Hà Đông",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Long Biên",
    "Hoàng Mai",
  ],
  "Đà Nẵng": [
    "Hải Châu",
    "Thanh Khê",
    "Liên Chiểu",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Cẩm Lệ",
    "Hòa Vang",
  ],
  "Cần Thơ": [
    "Ninh Kiều",
    "Bình Thủy",
    "Cái Răng",
    "Ô Môn",
    "Thốt Nốt",
    "Phong Điền",
  ],
  "Hải Phòng": [
    "Hồng Bàng",
    "Ngô Quyền",
    "Lê Chân",
    "Hải An",
    "Dương Kinh",
    "Kiến An",
    "Thủy Nguyên",
    "An Dương",
  ],
  "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát", "Tân Uyên"],
  "Đồng Nai": [
    "Biên Hòa",
    "Long Khánh",
    "Trảng Bom",
    "Long Thành",
    "Nhơn Trạch",
  ],
  "Khánh Hòa": ["Nha Trang", "Cam Ranh", "Diên Khánh", "Ninh Hòa", "Vạn Ninh"],
  "Lâm Đồng": ["Đà Lạt", "Bảo Lộc", "Đức Trọng", "Di Linh"],
  "Bình Thuận": ["Phan Thiết", "La Gi", "Bắc Bình", "Hàm Thuận Nam"],
};

const COD: React.FC<Props> = ({ onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [detail, setDetail] = useState("");

  const handleConfirm = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !province ||
      !district ||
      !detail.trim()
    ) {
      alert("❗ Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const fullAddress = `👤 ${name}\n📞 ${phone}\n🏠 ${detail}, ${district}, ${province}`;
    onConfirm(fullAddress);
  };

  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict(""); // reset quận khi đổi tỉnh
  };

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "500px", width: "95%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content p-4 border-0 rounded shadow">
          <h5 className="mb-3 text-center fw-bold text-primary">
            Thông tin giao hàng
          </h5>

          <div className="form-group text-start mb-2">
            <label>Họ tên người nhận:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group text-start mb-2">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              className="form-control"
              placeholder="09xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group text-start mb-2">
            <label>Tỉnh/Thành phố:</label>
            <select
              className="form-control"
              value={province}
              onChange={(e) => handleProvinceChange(e.target.value)}
            >
              <option value="">-- Chọn Tỉnh/Thành phố --</option>
              {Object.keys(provinces).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group text-start mb-2">
            <label>Quận/Huyện:</label>
            <select
              className="form-control"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!province}
            >
              <option value="">-- Chọn Quận/Huyện --</option>
              {province &&
                provinces[province].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group text-start mb-2">
            <label>Địa chỉ chi tiết:</label>
            <textarea
              className="form-control"
              placeholder="Số nhà, tên đường..."
              rows={2}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end mt-3 gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button className="btn btn-success" onClick={handleConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COD;
