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

# 3. Tạo database + bảng + dữ liệu mẫu (bao gồm các bài học)
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
| `database/` | `schema.sql`, `seed.sql`, nội dung bài học và câu hỏi Markdown được nạp khi chạy `db:setup` |
| `docs/` | Tài liệu, báo cáo, sơ đồ kiến trúc |

## Lệnh hữu ích

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy backend + frontend |
| `npm test` | Chạy test backend |
| `npm run build` | Build frontend |
| `npm run db:seed-lessons` | Đồng bộ lại các bài học và câu hỏi tự kiểm tra từ file lesson Markdown; không dùng `quiz_*.md` |

Sau khi cập nhật ứng dụng có bảng theo dõi tiến độ từng bài học, chạy `npm run db:setup` một lần để tạo bảng mới trong MySQL.
Test lưu tiến độ cần MySQL đã được cấu hình và có dữ liệu mẫu: `$env:RUN_DB_TESTS='1'; npm test --prefix backend -- --test-name-pattern="lesson completion"`.
