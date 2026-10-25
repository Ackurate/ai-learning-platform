-- seed.sql (v2): 7 chương cố định.
-- Chạy lại nhiều lần vẫn an toàn (ON DUPLICATE KEY UPDATE theo khóa chính).
-- Bài học và câu hỏi được nạp từ file markdown trong database/.
USE AI_Learning_Platform;

INSERT INTO chapters (chapter_id, title, description, order_index) VALUES
(1, 'Tổng quan ngôn ngữ C++', 'Giới thiệu C++, chương trình đầu tiên, biến, kiểu dữ liệu và nhập xuất cơ bản.', 1),
(2, 'Các cấu trúc điều khiển', 'Rẽ nhánh với if, else và switch; các vòng lặp for, while, do while.', 2),
(3, 'Dữ liệu kiểu mảng', 'Khai báo mảng một chiều, truy cập và duyệt phần tử, thêm và xóa phần tử trong mảng.', 3),
(4, 'Dữ liệu kiểu chuỗi', 'Chuỗi ký tự kiểu C và kiểu string, các thao tác xử lý chuỗi thường dùng.', 4),
(5, 'Con trỏ và hàm', 'Khái niệm con trỏ, truy cập địa chỉ và truyền tham số cho hàm bằng con trỏ, tham chiếu.', 5),
(6, 'Dữ liệu kiểu cấu trúc', 'Khai báo struct, truy cập thành phần và làm việc với mảng các struct.', 6),
(7, 'Dữ liệu kiểu tập tin', 'Đọc và ghi tập tin văn bản với thư viện fstream.', 7)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  order_index = VALUES(order_index);