---
chapter_id: 5
quiz_title: "Quiz: Con trỏ và hàm"
total_questions: 30
pass_threshold: 70
---

**## Nhóm 1: Dễ**

**### 5.q01 | easy | multiple_choice**

**Câu hỏi:** Con trỏ trong C++ thường dùng để lưu trữ thông tin gì?

- A. Địa chỉ vùng nhớ
- B. Tên hàm
- C. Tên tệp
- D. Giá trị logic

**Đáp án đúng:** A

**### 5.q02 | easy | multiple_choice**

**Câu hỏi:** Toán tử nào dùng để lấy địa chỉ của một biến?

- A. `*`
- B. `&`
- C. `%`
- D. `!`

**Đáp án đúng:** B

**### 5.q03 | easy | multiple_choice**

**Câu hỏi:** Cho khai báo `int *p;`. Con trỏ `p` được dùng để trỏ đến đối tượng thuộc kiểu dữ liệu nào?

- A. `char`
- B. `float`
- C. `int`
- D. `bool`

**Đáp án đúng:** C

**### 5.q04 | easy | code**

**Câu hỏi:** Giá trị của biểu thức `*p` là bao nhiêu?

```cpp
int x = 7;
int *p = &x;
```

- A. Địa chỉ của `x`
- B. `7`
- C. `0`
- D. Không xác định

**Đáp án đúng:** B

**### 5.q05 | easy | multiple_choice**

**Câu hỏi:** Kiểu trả về `void` của một hàm thể hiện điều gì?

- A. Hàm trả về số nguyên
- B. Hàm trả về ký tự
- C. Hàm không trả về giá trị
- D. Hàm không được phép có tham số

**Đáp án đúng:** C

**### 5.q06 | easy | multiple_choice**

**Câu hỏi:** Trong khai báo hàm, kiểu dữ liệu đứng trước tên hàm thường cho biết điều gì?

- A. Kiểu dữ liệu của giá trị trả về
- B. Số lần gọi hàm
- C. Tên chương trình
- D. Địa chỉ của hàm

**Đáp án đúng:** A

**### 5.q07 | easy | multiple_choice**

**Câu hỏi:** Trong C++, chuỗi ký tự kiểu C thường kết thúc bằng ký tự nào?

- A. `'\n'`
- B. `'\t'`
- C. `'\0'`
- D. `' '`

**Đáp án đúng:** C

**### 5.q08 | easy | multiple_choice**

**Câu hỏi:** Từ khóa `new` thường được sử dụng để làm gì?

- A. Khai báo hàm
- B. Cấp phát vùng nhớ động
- C. Đóng chương trình
- D. Xóa biến cục bộ

**Đáp án đúng:** B

**### 5.q09 | easy | multiple_choice**

**Câu hỏi:** Trong hàm đệ quy, trường hợp cơ sở có vai trò gì?

- A. Làm hàm gọi lại chính nó vô hạn
- B. Làm chương trình luôn trả về 0
- C. Giúp xác định điểm dừng của quá trình đệ quy
- D. Thay thế toàn bộ tham số của hàm

**Đáp án đúng:** C

**### 5.q10 | easy | multiple_choice**

**Câu hỏi:** Theo định nghĩa tổ hợp, việc chọn `k` phần tử từ `n` phần tử mà không xét thứ tự được gọi là gì?

- A. Hoán vị
- B. Tổ hợp
- C. Phép cộng
- D. Phép chia

**Đáp án đúng:** B

**## Nhóm 2: Trung bình**

**### 5.q11 | medium | code**

**Câu hỏi:** Sau khi thực hiện đoạn code, giá trị của `a` là bao nhiêu?

```cpp
int a = 4;
int *p = &a;
*p = 10;
```

- A. `4`
- B. `10`
- C. Địa chỉ của `a`
- D. `0`

**Đáp án đúng:** B

**### 5.q12 | medium | multiple_choice**

**Câu hỏi:** Cho khai báo `int a[5];` và con trỏ `p` đang trỏ đến `a[0]`. Trong phạm vi mảng, `p + 1` trỏ đến đâu?

- A. `a[0]`
- B. `a[1]`
- C. `a[2]`
- D. Phần tử cuối cùng của mảng

**Đáp án đúng:** B

**### 5.q13 | medium | code**

**Câu hỏi:** Sau khi thực hiện đoạn code, con trỏ `q` lưu giá trị gì?

```cpp
int a = 5;
int *p = &a;
int *q = p;
```

- A. Giá trị `5`
- B. Địa chỉ mà `p` đang lưu
- C. Kích thước của `a`
- D. Địa chỉ của biến `q`

**Đáp án đúng:** B

**### 5.q14 | medium | multiple_choice**

**Câu hỏi:** Cặp thao tác nào phù hợp để cấp phát và giải phóng một đối tượng đơn lẻ trong C++?

- A. `new` và `delete`
- B. `new[]` và `delete`
- C. `new` và `delete[]`
- D. `cin` và `cout`

**Đáp án đúng:** A

**### 5.q15 | medium | multiple_choice**

**Câu hỏi:** Một mảng được cấp phát bằng `new[]`. Cách giải phóng phù hợp là gì?

- A. `delete`
- B. `delete[]`
- C. `remove`
- D. `nullptr`

**Đáp án đúng:** B

**### 5.q16 | medium | multiple_choice**

**Câu hỏi:** Khi duyệt một chuỗi ký tự kiểu C bằng con trỏ, điều kiện nào thường được dùng để nhận biết cuối chuỗi?

- A. Con trỏ bằng `1`
- B. Gặp ký tự `'\0'`
- C. Gặp ký tự `'A'`
- D. Gặp dấu chấm phẩy

**Đáp án đúng:** B

**### 5.q17 | medium | multiple_choice**

**Câu hỏi:** Đặc điểm nào đúng về quá tải hàm trong C++?

- A. Các hàm cùng tên phải có cùng danh sách tham số
- B. Chỉ cần khác kiểu trả về là có thể quá tải
- C. Có thể có nhiều hàm cùng tên với danh sách tham số khác nhau phù hợp quy tắc
- D. Các hàm quá tải không được nhận tham số

**Đáp án đúng:** C

**### 5.q18 | medium | multiple_choice**

**Câu hỏi:** Đối số mặc định được sử dụng trong trường hợp nào?

- A. Khi lời gọi hàm bỏ qua đối số tương ứng
- B. Khi hàm không có tên
- C. Khi chương trình không khai báo biến
- D. Khi hàm bắt buộc không có tham số

**Đáp án đúng:** A

**### 5.q19 | medium | multiple_choice**

**Câu hỏi:** Điều gì xảy ra với tham số khi một biến kiểu `int` được truyền vào hàm theo giá trị?

- A. Tham số trở thành chính biến gốc
- B. Hàm nhận bản sao giá trị của biến
- C. Biến gốc tự động bị xóa
- D. Giá trị của biến luôn tăng thêm 1

**Đáp án đúng:** B

**### 5.q20 | medium | multiple_choice**

**Câu hỏi:** Cách truyền tham số nào cho phép hàm thay đổi trực tiếp đối tượng gốc thông qua tham số tham chiếu?

- A. Truyền theo giá trị
- B. Truyền tham chiếu
- C. Không truyền tham số
- D. Chỉ truyền hằng số

**Đáp án đúng:** B

**### 5.q21 | medium | code**

**Câu hỏi:** Giá trị trả về của lời gọi `tong(3, 6)` là bao nhiêu?

```cpp
int tong(int a, int b) {
    return a + b;
}
```

- A. `3`
- B. `6`
- C. `9`
- D. `18`

**Đáp án đúng:** C

**### 5.q22 | medium | multiple_choice**

**Câu hỏi:** Trong thuật toán Euclid tìm ước chung lớn nhất, nếu `b` khác `0` thì bước biến đổi nào thường được sử dụng?

- A. Thay `(a, b)` bằng `(b, a % b)`
- B. Thay `(a, b)` bằng `(a + b, a)`
- C. Thay `(a, b)` bằng `(a * b, b)`
- D. Luôn đặt `a = 0`

**Đáp án đúng:** A

**## Nhóm 3: Khó**

**### 5.q23 | hard | code**

**Câu hỏi:** Giá trị cuối cùng của `a` và `b` lần lượt là bao nhiêu?

```cpp
int a = 3;
int b = 8;
int *p = &a;
p = &b;
*p = 12;
```

- A. `a = 12`, `b = 8`
- B. `a = 3`, `b = 12`
- C. `a = 12`, `b = 12`
- D. `a = 3`, `b = 8`

**Đáp án đúng:** B

**### 5.q24 | hard | multiple_choice**

**Câu hỏi:** Điều gì có thể xảy ra khi giải tham chiếu một con trỏ chưa được khởi tạo hợp lệ?

- A. Luôn nhận được giá trị `0`
- B. Luôn nhận được địa chỉ của biến gần nhất
- C. Có thể xảy ra hành vi không xác định
- D. Con trỏ tự động được cấp phát vùng nhớ

**Đáp án đúng:** C

**### 5.q25 | hard | multiple_choice**

**Câu hỏi:** Cho hàm đệ quy tính giai thừa với điều kiện cơ sở `giaiThua(0) = 1`. Với đầu vào là số nguyên không âm, cách gọi nào thể hiện đúng quan hệ đệ quy thông thường?

- A. `giaiThua(n) = n * giaiThua(n - 1)` với `n > 0`
- B. `giaiThua(n) = n + giaiThua(n)`
- C. `giaiThua(n) = giaiThua(n + 1)`
- D. `giaiThua(n) = n - giaiThua(n - 1)`

**Đáp án đúng:** A

**### 5.q26 | hard | multiple_choice**

**Câu hỏi:** Một hàm đệ quy gọi lại chính nó với cùng tham số và không có điều kiện dừng có thể dẫn đến hậu quả nào?

- A. Hàm luôn kết thúc sau một lần gọi
- B. Chương trình có thể tiếp tục gọi hàm cho đến khi tràn ngăn xếp
- C. Trình biên dịch luôn tự động đổi thành vòng lặp
- D. Mọi biến tự động chuyển thành biến toàn cục

**Đáp án đúng:** B

**### 5.q27 | hard | code**

**Câu hỏi:** Với định nghĩa Fibonacci `F(0) = 0`, `F(1) = 1` và `F(n) = F(n - 1) + F(n - 2)` khi `n >= 2`, giá trị `F(5)` là bao nhiêu?

- A. `3`
- B. `5`
- C. `8`
- D. `13`

**Đáp án đúng:** B

**### 5.q28 | hard | multiple_choice**

**Câu hỏi:** Với `0 < k < n`, công thức đệ quy Pascal cho tổ hợp là gì?

- A. \(C(n,k)=C(n-1,k)+C(n-1,k-1)\)
- B. \(C(n,k)=n+k\)
- C. \(C(n,k)=n-k\)
- D. \(C(n,k)=C(n-1,k)\) trong mọi trường hợp

**Đáp án đúng:** A

**### 5.q29 | hard | multiple_choice**

**Câu hỏi:** Một hàm đệ quy được thiết kế để in các số lẻ từ `n` giảm dần đến `1`, với `n` là số lẻ dương. Cách giảm tham số nào phù hợp để tiến đến điều kiện dừng?

- A. `n + 2`
- B. `n`
- C. `n - 2`
- D. `n * 2`

**Đáp án đúng:** C

**### 5.q30 | hard | multiple_choice**

**Câu hỏi:** Khi lựa chọn giữa thuật toán lặp và thuật toán đệ quy, nhận định nào phù hợp nhất?

- A. Đệ quy luôn nhanh hơn vòng lặp
- B. Vòng lặp luôn dễ viết hơn đệ quy
- C. Cần cân nhắc độ rõ ràng của thuật toán, chi phí lời gọi hàm và nguy cơ tràn ngăn xếp
- D. Hai phương pháp luôn có tốc độ và mức sử dụng bộ nhớ giống hệt nhau

**Đáp án đúng:** C