# Website hỗ trợ học lập trình cơ bản tích hợp AI

Đồ án 15 tuần: React + Vite (frontend) · Node.js/Express (backend) · MySQL (database) · LLM API (AI).

## Yêu cầu

- Node.js 20+
- MySQL 8+ (hoặc MariaDB qua XAMPP)
- Một API key của LLM (chỉ cần khi dùng tính năng hỏi AI)

## Cài đặt nhanh

```bash
# 1. Cài thư viện cho cả 3 phần (gốc, backend, frontend)
npm run install:all

# 2. Tạo file biến môi trường; điền DB_PASSWORD nếu MySQL có mật khẩu (XAMPP local có thể để trống), JWT_SECRET và LLM_API_KEY
cp backend/.env.example backend/.env

# 3. Tạo database + bảng + dữ liệu mẫu
npm run db:setup

# 4. Chạy cả backend và frontend cùng lúc
npm run dev
```

- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:5173

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `backend/` | API Express: auth, chapters, questions, quiz, progress, ai |
| `frontend/` | Giao diện React + Vite |
| `database/` | `schema.sql` (cấu trúc bảng), `seed.sql` (dữ liệu mẫu) |
| `docs/` | Tài liệu, báo cáo, sơ đồ kiến trúc |

## Lệnh hữu ích

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy backend + frontend |
| `npm test` | Chạy test backend |
| `npm run build` | Build frontend |
