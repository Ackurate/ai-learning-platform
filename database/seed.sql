-- Dữ liệu mẫu: 7 chương C++ cơ bản + 10 câu hỏi mẫu.
-- Chạy lại nhiều lần vẫn an toàn (ON DUPLICATE KEY UPDATE theo khóa chính).
-- Ngân hàng 100–200 câu đầy đủ sẽ được bổ sung ở tuần 10.
USE AI_Learning_Platform;

INSERT INTO chapters (chapter_id, title, description, order_index) VALUES
(1, 'Nhập môn và cú pháp C++', 'Chương trình C++ đầu tiên, cấu trúc hàm main, nhập xuất với cin và cout.', 1),
(2, 'Biến và kiểu dữ liệu', 'Khai báo biến, các kiểu int, double, char, bool, string và phép toán cơ bản.', 2),
(3, 'Cấu trúc điều kiện', 'Câu lệnh if, else if, else và switch.', 3),
(4, 'Vòng lặp', 'Vòng lặp for, while, do while; break và continue.', 4),
(5, 'Hàm', 'Khai báo và gọi hàm, tham số, giá trị trả về, truyền tham trị và tham chiếu.', 5),
(6, 'Mảng và chuỗi', 'Mảng một chiều, duyệt mảng, chuỗi ký tự trong C++.', 6),
(7, 'OOP cơ bản', 'Class, object, thuộc tính, phương thức và hàm khởi tạo.', 7)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  order_index = VALUES(order_index);

INSERT INTO questions (question_id, chapter_id, content, question_type, options, correct_answer, explanation, difficulty) VALUES
(1, 1, 'Hàm nào là điểm bắt đầu thực thi của một chương trình C++?', 'multiple_choice',
 '["start()", "main()", "run()", "begin()"]', 'main()',
 'Chương trình C++ luôn bắt đầu chạy từ hàm main().', 'easy'),
(2, 1, 'Đối tượng nào dùng để in dữ liệu ra màn hình trong C++?', 'multiple_choice',
 '["cin", "cout", "printf", "print"]', 'cout',
 'cout (trong thư viện iostream) dùng để xuất dữ liệu ra màn hình.', 'easy'),
(3, 2, 'Kiểu dữ liệu nào phù hợp để lưu số thực như 3.14?', 'multiple_choice',
 '["int", "char", "double", "bool"]', 'double',
 'double lưu số thực có độ chính xác cao; int chỉ lưu số nguyên.', 'easy'),
(4, 2, 'Kết quả của biểu thức 7 / 2 khi cả hai toán hạng là int?', 'multiple_choice',
 '["3.5", "3", "4", "2"]', '3',
 'Chia hai số nguyên trong C++ cho kết quả là số nguyên (phần nguyên): 3.', 'medium'),
(5, 3, 'Từ khóa nào dùng để rẽ nhánh khi điều kiện của if sai?', 'multiple_choice',
 '["otherwise", "else", "elif", "then"]', 'else',
 'C++ dùng else (và else if), không có elif như Python.', 'easy'),
(6, 4, 'Vòng lặp nào luôn thực hiện thân vòng lặp ít nhất một lần?', 'multiple_choice',
 '["for", "while", "do while", "foreach"]', 'do while',
 'do while kiểm tra điều kiện sau khi chạy thân vòng lặp nên luôn chạy ít nhất một lần.', 'medium'),
(7, 4, 'Câu lệnh nào kết thúc ngay vòng lặp hiện tại và thoát khỏi vòng lặp?', 'multiple_choice',
 '["continue", "exit", "break", "stop"]', 'break',
 'break thoát khỏi vòng lặp; continue chỉ bỏ qua lần lặp hiện tại.', 'easy'),
(8, 5, 'Hàm không trả về giá trị có kiểu trả về là gì?', 'multiple_choice',
 '["null", "void", "empty", "none"]', 'void',
 'Kiểu void biểu thị hàm không trả về giá trị.', 'easy'),
(9, 6, 'Chỉ số của phần tử đầu tiên trong mảng C++ là?', 'multiple_choice',
 '["0", "1", "-1", "Tùy mảng"]', '0',
 'Mảng trong C++ đánh chỉ số từ 0.', 'easy'),
(10, 7, 'Hàm đặc biệt được gọi tự động khi tạo một đối tượng của class gọi là gì?', 'multiple_choice',
 '["Destructor", "Constructor", "Main", "Method"]', 'Constructor',
 'Constructor (hàm khởi tạo) chạy khi đối tượng được tạo.', 'medium')
ON DUPLICATE KEY UPDATE
  chapter_id = VALUES(chapter_id),
  content = VALUES(content),
  question_type = VALUES(question_type),
  options = VALUES(options),
  correct_answer = VALUES(correct_answer),
  explanation = VALUES(explanation),
  difficulty = VALUES(difficulty);