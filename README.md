# Brewlite Project

Hệ thống quản lý và đặt thức uống Brewlite.

---

## 📋 Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) (khuyến nghị phiên bản LTS từ v18 trở lên)
- Trình quản lý gói `npm` (hoặc `yarn`, `pnpm`)
- Tài khoản MongoDB Atlas (hoặc MongoDB cài cục bộ)

---

## 🚀 Hướng dẫn cài đặt & Cấu hình

### 1. Cài đặt các thư viện phụ thuộc (Dependencies)

Mở terminal tại thư mục gốc của dự án và chạy lệnh:

```bash
npm install
```

Các thư viện đã cấu hình:
- `mongoose`: Thư viện ODM kết nối và thao tác với cơ sở dữ liệu MongoDB.
- `dotenv`: Đọc biến môi trường từ file `.env`.

---

### 2. Cấu hình biến môi trường (`.env`)

Tạo một file `.env` tại thư mục gốc của dự án (nếu chưa có) với nội dung:

```env
PORT=3000
MONGODB_URI=mongodb+srv://vohuunghiaah_db_user:<PASSWORD>@brewlite-cluster.gqbpydy.mongodb.net/brewlite_db?appName=brewlite-cluster
```

> **Lưu ý quan trọng về bảo mật:**
> - Thay thế `<PASSWORD>` bằng tài khoản Database User thực tế của bạn trên MongoDB Atlas.
> - File `.env` chứa mật khẩu đã được thêm vào `.gitignore`, **tuyệt đối không commit hoặc push file `.env` lên GitHub/GitLab**.

---

### 3. Cấu trúc thư mục kết nối cơ sở dữ liệu

- `config/db.js`: Chứa hàm `connectDB()` kết nối đến MongoDB Atlas qua `mongoose`.
- `server.js`: File khởi chạy chính của ứng dụng và thực hiện gọi hàm kết nối.
- `.gitignore`: Bỏ qua các file nhạy cảm và thư mục rác (`node_modules/`, `.env`,...).

---

### 4. Khởi chạy và kiểm tra kết nối

Chạy ứng dụng bằng lệnh:

```bash
npm start
# hoặc
npm run dev
# hoặc
node server.js
```

Khi kết nối thành công, console sẽ hiển thị thông báo:
```text
Đã kết nối thành công tới MongoDB Atlas (brewlite-cluster)!
```

---

## ⚠️ Khắc phục lỗi thường gặp

1. **Lỗi `bad auth : authentication failed`**:
   - Kiểm tra lại username và mật khẩu trong `MONGODB_URI` trong file `.env`. Đảm bảo mật khẩu không chứa các ký tự đặc biệt chưa được mã hóa URL (URL encode).

2. **Lỗi kết nối timeout / `MongooseServerSelectionError`**:
   - Vào MongoDB Atlas -> **Network Access** -> Chọn **Add IP Address**.
   - Thêm IP hiện tại của bạn hoặc chọn **Allow Access from Anywhere** (`0.0.0.0/0`) cho môi trường phát triển (development).