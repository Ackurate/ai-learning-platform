---
chapter_id: 7
quiz_title: "Quiz: Tập tin"
total_questions: 30
pass_threshold: 70
---

**### 7.q01 | easy | multiple_choice**

**Câu hỏi:** Tập tin (file) được sử dụng chủ yếu để làm gì?

A. Lưu trữ dữ liệu trên thiết bị lưu trữ  
B. Thay thế toàn bộ câu lệnh trong chương trình  
C. Tự động sửa lỗi cú pháp  
D. Chỉ lưu giá trị của biến cục bộ  

**Đáp án đúng:** A

**### 7.q02 | easy | multiple_choice**

**Câu hỏi:** Trong C++, thư viện nào thường được sử dụng để thao tác với tập tin?

A. `<cmath>`  
B. `<fstream>`  
C. `<iomanip>`  
D. `<cstdlib>`  

**Đáp án đúng:** B

**### 7.q03 | easy | multiple_choice**

**Câu hỏi:** Lớp nào thường được dùng để đọc dữ liệu từ tập tin?

A. `ifstream`  
B. `ofstream`  
C. `ostream`  
D. `iomanip`  

**Đáp án đúng:** A

**### 7.q04 | easy | multiple_choice**

**Câu hỏi:** Lớp nào thường được dùng để ghi dữ liệu ra tập tin?

A. `ifstream`  
B. `ofstream`  
C. `istream`  
D. `cin`  

**Đáp án đúng:** B

**### 7.q05 | easy | multiple_choice**

**Câu hỏi:** Lớp nào có thể dùng cho cả thao tác đọc và ghi tập tin?

A. `ifstream`  
B. `ofstream`  
C. `fstream`  
D. `istream`  

**Đáp án đúng:** C

**### 7.q06 | easy | multiple_choice**

**Câu hỏi:** Thao tác nào thường được thực hiện sau khi hoàn tất việc đọc hoặc ghi tập tin?

A. Đóng tập tin  
B. Khai báo lại toàn bộ chương trình  
C. Xóa thư viện  
D. Đổi tên tất cả biến  

**Đáp án đúng:** A

**### 7.q07 | easy | multiple_choice**

**Câu hỏi:** Tập tin văn bản thường lưu dữ liệu dưới dạng nào?

A. Các ký tự có thể đọc được dưới dạng văn bản  
B. Chỉ các địa chỉ bộ nhớ  
C. Chỉ các đối tượng C++  
D. Chỉ các lệnh máy thực thi  

**Đáp án đúng:** A

**### 7.q08 | easy | multiple_choice**

**Câu hỏi:** Tập tin nhị phân lưu dữ liệu chủ yếu dưới dạng nào?

A. Các câu văn hoàn chỉnh  
B. Các byte dữ liệu  
C. Chỉ các chữ cái  
D. Chỉ các số thập phân được phân cách bằng dấu phẩy  

**Đáp án đúng:** B

**### 7.q09 | easy | multiple_choice**

**Câu hỏi:** Hàm thành viên `close()` thường được sử dụng để làm gì?

A. Đóng luồng tập tin  
B. Xóa nội dung của biến  
C. Tính độ dài chuỗi  
D. Đổi kiểu dữ liệu  

**Đáp án đúng:** A

**### 7.q10 | easy | multiple_choice**

**Câu hỏi:** Trong bài toán quản lý nhân viên bằng tập tin, dữ liệu nào có thể được lưu?

A. Mã nhân viên và họ tên  
B. Chỉ tên của trình biên dịch  
C. Chỉ số dòng trong mã nguồn  
D. Chỉ tên thư viện C++  

**Đáp án đúng:** A

**### 7.q11 | medium | multiple_choice**

**Câu hỏi:** Muốn mở tập tin `dulieu.txt` để đọc bằng `ifstream`, cách khai báo nào phù hợp?

A. `ifstream f("dulieu.txt");`  
B. `ofstream f("dulieu.txt");`  
C. `int f("dulieu.txt");`  
D. `fstream("dulieu.txt");`  

**Đáp án đúng:** A

**### 7.q12 | medium | multiple_choice**

**Câu hỏi:** Khi sử dụng `ofstream` để mở tập tin theo chế độ ghi thông thường, điều gì có thể xảy ra nếu tập tin đã tồn tại?

A. Nội dung cũ có thể bị xóa để ghi nội dung mới  
B. Tập tin luôn được chuyển thành thư mục  
C. Chương trình tự động đọc toàn bộ nội dung cũ  
D. Tập tin không bao giờ được mở  

**Đáp án đúng:** A

**### 7.q13 | medium | multiple_choice**

**Câu hỏi:** Trong C++, chế độ `ios::app` có tác dụng gì khi mở tập tin?

A. Nối dữ liệu ghi thêm vào cuối tập tin  
B. Chỉ cho phép đọc tập tin  
C. Xóa thư mục chứa tập tin  
D. Tự động chuyển tập tin thành tập tin nhị phân  

**Đáp án đúng:** A

**### 7.q14 | medium | multiple_choice**

**Câu hỏi:** Câu lệnh nào kiểm tra trạng thái mở tập tin theo cách thường dùng?

A. `if (f.is_open())`  
B. `if (f.close())`  
C. `if (f.delete())`  
D. `if (f.reading())`  

**Đáp án đúng:** A

**### 7.q15 | medium | multiple_choice**

**Câu hỏi:** Trong thao tác đọc tập tin văn bản, toán tử `>>` thường đọc dữ liệu theo cách nào?

A. Đọc một chuỗi ký tự bất kỳ, luôn bao gồm mọi dấu cách  
B. Đọc một giá trị hoặc từ và thường dừng tại khoảng trắng  
C. Xóa tập tin sau khi đọc  
D. Chỉ đọc dữ liệu nhị phân  

**Đáp án đúng:** B

**### 7.q16 | medium | multiple_choice**

**Câu hỏi:** Hàm `getline()` thường hữu ích khi đọc tập tin văn bản trong trường hợp nào?

A. Cần đọc cả một dòng, kể cả khoảng trắng ở giữa  
B. Chỉ cần đọc một số nguyên  
C. Cần xóa tập tin  
D. Cần đổi tên tập tin  

**Đáp án đúng:** A

**### 7.q17 | medium | multiple_choice**

**Câu hỏi:** Trong C++, `ios::binary` được sử dụng để làm gì khi mở tập tin?

A. Mở luồng ở chế độ nhị phân  
B. Tự động nén tập tin  
C. Chuyển tất cả dữ liệu thành chuỗi  
D. Chỉ cho phép đọc ký tự chữ cái  

**Đáp án đúng:** A

**### 7.q18 | medium | multiple_choice**

**Câu hỏi:** Hàm `read()` của luồng tập tin nhị phân thường được dùng để làm gì?

A. Đọc một lượng byte từ tập tin vào vùng nhớ  
B. Ghi một chuỗi ra màn hình  
C. Đổi tên tập tin  
D. Xóa một đối tượng trong bộ nhớ  

**Đáp án đúng:** A

**### 7.q19 | medium | multiple_choice**

**Câu hỏi:** Hàm `write()` của luồng tập tin nhị phân thường dùng để làm gì?

A. Ghi dữ liệu từ vùng nhớ ra tập tin  
B. Chỉ đọc một dòng văn bản  
C. Kiểm tra tên biến  
D. Đóng chương trình  

**Đáp án đúng:** A

**### 7.q20 | medium | multiple_choice**

**Câu hỏi:** Hàm `gcount()` của luồng nhập thường trả về thông tin gì sau thao tác đọc không định dạng?

A. Số byte hoặc ký tự đã được đọc trong thao tác gần nhất  
B. Tên của tập tin  
C. Số lượng biến trong chương trình  
D. Tổng số dòng trong mọi tập tin  

**Đáp án đúng:** A

**### 7.q21 | medium | multiple_choice**

**Câu hỏi:** Khi sao chép một tập tin nhị phân, vì sao cần chú ý số byte thực tế đọc được?

A. Vì lần đọc cuối có thể chứa ít byte hơn số byte yêu cầu  
B. Vì mọi lần đọc luôn trả về đúng một byte  
C. Vì tập tin nhị phân không có byte  
D. Vì số byte đọc được luôn bằng 0  

**Đáp án đúng:** A

**### 7.q22 | medium | multiple_choice**

**Câu hỏi:** Trong chương trình tính độ dài tập tin nhị phân, `seekg()` và `tellg()` thường được dùng với mục đích nào?

A. Di chuyển vị trí đọc và xác định vị trí hiện tại của luồng  
B. Đổi tên tập tin và thư mục  
C. Tự động sửa nội dung tập tin  
D. Chuyển dữ liệu thành văn bản  

**Đáp án đúng:** A

**### 7.q23 | hard | multiple_choice**

**Câu hỏi:** Một chương trình mở tập tin bằng `ofstream f("data.txt");` rồi ghi dữ liệu. Nếu muốn ghi nối tiếp vào cuối tập tin thay vì thay thế nội dung cũ, cần bổ sung chế độ nào?

A. `ios::in`  
B. `ios::app`  
C. `ios::binary`  
D. `ios::trunc`  

**Đáp án đúng:** B

**### 7.q24 | hard | multiple_choice**

**Câu hỏi:** Một chương trình dùng `ifstream` mở tập tin nhưng tập tin không tồn tại. Cách xử lý nào hợp lý nhất?

A. Tiếp tục đọc mà không kiểm tra trạng thái  
B. Kiểm tra việc mở tập tin và thông báo lỗi nếu thất bại  
C. Giả định tập tin tự được tạo  
D. Gọi `write()` trên mọi luồng mà không kiểm tra  

**Đáp án đúng:** B

**### 7.q25 | hard | multiple_choice**

**Câu hỏi:** Một chương trình sao chép tập tin nhị phân theo từng khối byte. Sau khi gọi `read(buffer, sizeof(buffer))`, chương trình muốn ghi đúng lượng dữ liệu vừa đọc. Nên dùng thông tin nào?

A. Luôn ghi `sizeof(buffer)` byte bất kể kết quả đọc  
B. Số byte thực tế đọc được, có thể lấy bằng `gcount()`  
C. Số dòng của tập tin nguồn  
D. Số ký tự trong tên tập tin  

**Đáp án đúng:** B

**### 7.q26 | hard | multiple_choice**

**Câu hỏi:** Khi tính độ dài tập tin bằng cách chuyển con trỏ đọc đến cuối rồi lấy vị trí bằng `tellg()`, giá trị vị trí thường biểu thị điều gì trong cách xử lý tập tin nhị phân?

A. Số byte tính từ đầu tập tin đến vị trí đó  
B. Số từ trong tập tin  
C. Số dòng văn bản  
D. Số biến toàn cục trong chương trình  

**Đáp án đúng:** A

**### 7.q27 | hard | multiple_choice**

**Câu hỏi:** Một chương trình cần lưu dữ liệu có thể chứa các byte không biểu diễn văn bản. Cách mở tập tin nào phù hợp nhất?

A. Chỉ mở theo chế độ văn bản  
B. Mở với chế độ nhị phân `ios::binary` kết hợp chế độ đọc hoặc ghi phù hợp  
C. Chỉ dùng `getline()`  
D. Dùng `cout` thay cho luồng tập tin  

**Đáp án đúng:** B

**### 7.q28 | hard | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý nhân viên dùng tập tin văn bản, vì sao cần xác định rõ cách phân tách các trường dữ liệu?

A. Để chương trình có thể đọc lại và phân biệt đúng từng thông tin  
B. Để tập tin tự động được mã hóa  
C. Để không cần kiểm tra dữ liệu đầu vào  
D. Để mỗi nhân viên bắt buộc chỉ có một trường  

**Đáp án đúng:** A

**### 7.q29 | hard | multiple_choice**

**Câu hỏi:** Khi đọc dữ liệu nhị phân bằng `read()`, chương trình yêu cầu đọc 100 byte nhưng chỉ còn 35 byte trong tập tin. Kết quả nào phù hợp nhất?

A. Luôn đọc đủ 100 byte bằng cách tự thêm dữ liệu  
B. Có thể chỉ đọc được 35 byte và luồng thể hiện trạng thái cuối tập tin  
C. Tập tin tự tăng lên 100 byte  
D. Chương trình tự động chuyển 65 byte còn thiếu thành số 0  

**Đáp án đúng:** B

**### 7.q30 | hard | multiple_choice**

**Câu hỏi:** Một chương trình sao chép tập tin nhị phân theo từng khối. Cách xử lý nào an toàn hơn khi gặp khối cuối cùng ngắn hơn kích thước bộ đệm?

A. Luôn ghi toàn bộ bộ đệm dù chỉ đọc được một phần  
B. Ghi đúng số byte thực tế đọc được rồi kết thúc khi không còn dữ liệu  
C. Bỏ qua mọi lần đọc cuối  
D. Ghi thêm các byte ngẫu nhiên cho đủ kích thước  

**Đáp án đúng:** B