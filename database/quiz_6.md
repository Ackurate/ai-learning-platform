---
chapter_id: 6
quiz_title: "Quiz: Dữ liệu kiểu cấu trúc"
total_questions: 30
pass_threshold: 70
---

**## Nhóm 1: Dễ**

**### 6.q01 | easy | multiple_choice**

**Câu hỏi:** Trong C++, kiểu cấu trúc `struct` được sử dụng chủ yếu để làm gì?

- A. Gom nhiều thành phần dữ liệu thành một kiểu dữ liệu
- B. Chỉ lưu trữ một ký tự
- C. Chỉ thực hiện phép tính số học
- D. Thay thế hoàn toàn các câu lệnh điều kiện

**Đáp án đúng:** A

**### 6.q02 | easy | multiple_choice**

**Câu hỏi:** Từ khóa nào thường được dùng để khai báo kiểu cấu trúc trong C++?

- A. `classify`
- B. `struct`
- C. `record`
- D. `group`

**Đáp án đúng:** B

**### 6.q03 | easy | multiple_choice**

**Câu hỏi:** Trong khai báo cấu trúc, mỗi thành phần dữ liệu thường được xác định bởi yếu tố nào?

- A. Kiểu dữ liệu và tên thành phần
- B. Chỉ số dòng của chương trình
- C. Tên của hệ điều hành
- D. Địa chỉ của tệp chương trình

**Đáp án đúng:** A

**### 6.q04 | easy | code**

**Câu hỏi:** Cấu trúc `SinhVien` có bao nhiêu thành phần dữ liệu?

```cpp
struct SinhVien {
    int maSo;
    float diem;
};
```

- A. `1`
- B. `2`
- C. `3`
- D. `4`

**Đáp án đúng:** B

**### 6.q05 | easy | multiple_choice**

**Câu hỏi:** Sau khi khai báo kiểu cấu trúc `SinhVien`, câu lệnh nào tạo một biến có kiểu đó?

- A. `SinhVien sv;`
- B. `struct;`
- C. `int SinhVien;`
- D. `sv SinhVien();`

**Đáp án đúng:** A

**### 6.q06 | easy | multiple_choice**

**Câu hỏi:** Toán tử nào được sử dụng để truy cập thành phần của một biến cấu trúc thông thường?

- A. `->`
- B. `.`
- C. `::`
- D. `&`

**Đáp án đúng:** B

**### 6.q07 | easy | code**

**Câu hỏi:** Biểu thức nào truy cập thành phần `gia` của biến `s`?

```cpp
struct Sach {
    int maSach;
    float gia;
};

Sach s;
```

- A. `s->gia`
- B. `Sach.gia`
- C. `s.gia`
- D. `gia.s`

**Đáp án đúng:** C

**### 6.q08 | easy | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý sách, thông tin nào phù hợp để lưu trong một cấu trúc `Sach`?

- A. Mã sách, tên sách và giá sách
- B. Chỉ một phép toán
- C. Chỉ tên chương trình
- D. Chỉ số dòng lệnh

**Đáp án đúng:** A

**### 6.q09 | easy | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý sinh viên, mục đích của việc dùng cấu trúc `SinhVien` là gì?

- A. Nhóm các thông tin thuộc về một sinh viên
- B. Tự động tạo tài khoản sinh viên
- C. Thay thế tất cả vòng lặp
- D. Tự động sắp xếp sinh viên theo điểm

**Đáp án đúng:** A

**### 6.q10 | easy | multiple_choice**

**Câu hỏi:** Trong bài toán xử lý phân số, một phân số thông thường cần lưu những thành phần nào?

- A. Tử số và mẫu số
- B. Tên sách và tác giả
- C. Mã sinh viên và điểm
- D. Ngày sinh và địa chỉ

**Đáp án đúng:** A

**## Nhóm 2: Trung bình**

**### 6.q11 | medium | code**

**Câu hỏi:** Câu lệnh nào gán giá trị `3` cho tử số của biến `p`?

```cpp
struct PhanSo {
    int tu;
    int mau;
};

PhanSo p;
```

- A. `p.tu = 3;`
- B. `p = tu.3;`
- C. `PhanSo.tu = 3;`
- D. `tu.p = 3;`

**Đáp án đúng:** A

**### 6.q12 | medium | code**

**Câu hỏi:** Biểu thức nào truy cập thành phần điểm của biến `sv`?

```cpp
struct SinhVien {
    int maSo;
    float diem;
};
```

- A. `sv.diem`
- B. `sv->diem`
- C. `SinhVien.diem`
- D. `diem.sv`

**Đáp án đúng:** A

**### 6.q13 | medium | code**

**Câu hỏi:** Câu lệnh nào chỉ cập nhật điểm mà không gán lại mã số của biến `sv`?

```cpp
struct SinhVien {
    int maSo;
    float diem;
};

SinhVien sv;
```

- A. `sv.diem = 8.5;`
- B. `sv.maSo = 8.5;`
- C. `sv = 8.5;`
- D. `diem = sv;`

**Đáp án đúng:** A

**### 6.q14 | medium | multiple_choice**

**Câu hỏi:** Một cấu trúc biểu diễn phân số có hai thành phần nguyên `tu` và `mau`. Điều kiện nào cần được chú ý để tránh phân số không hợp lệ?

- A. Tử số phải lớn hơn mẫu số
- B. Mẫu số phải khác `0`
- C. Tử số phải bằng `0`
- D. Mẫu số phải là số âm

**Đáp án đúng:** B

**### 6.q15 | medium | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý sách, mỗi biến cấu trúc `Sach` biểu diễn điều gì?

- A. Một cuốn sách với các thông tin được khai báo
- B. Toàn bộ chương trình
- C. Một câu lệnh điều kiện
- D. Một phép tính số học duy nhất

**Đáp án đúng:** A

**### 6.q16 | medium | multiple_choice**

**Câu hỏi:** Nếu cấu trúc `SinhVien` có các thành phần `maSo`, `hoTen` và `diem`, cách tổ chức dữ liệu nào phù hợp nhất?

- A. Lưu mỗi thông tin của một sinh viên ở các biến rời rạc không liên hệ
- B. Gom ba thông tin vào một biến cấu trúc `SinhVien`
- C. Chỉ lưu thành phần `diem`
- D. Dùng một biến kiểu `bool` để thay thế cả ba thông tin

**Đáp án đúng:** B

**### 6.q17 | medium | code**

**Câu hỏi:** Biểu thức nào truy cập mẫu số của biến `a` khi thành phần được đặt tên là `mau`?

```cpp
struct PhanSo {
    int tu;
    int mau;
};

PhanSo a;
```

- A. `a.mau`
- B. `a->mau`
- C. `PhanSo.mau`
- D. `mau->a`

**Đáp án đúng:** A

**### 6.q18 | medium | multiple_choice**

**Câu hỏi:** Khi nhập dữ liệu cho một biến cấu trúc quản lý sinh viên, cách làm nào phù hợp?

- A. Nhập từng thành phần tương ứng với thông tin cần lưu
- B. Chỉ nhập tên kiểu cấu trúc
- C. Chỉ nhập tên biến cấu trúc
- D. Bỏ qua toàn bộ dữ liệu nhưng vẫn xem là đã nhập đầy đủ

**Đáp án đúng:** A

**### 6.q19 | medium | multiple_choice**

**Câu hỏi:** Một chương trình cần tính hiệu của hai phân số. Vì sao nên biểu diễn mỗi phân số bằng một cấu trúc?

- A. Để lưu tử số và mẫu số cùng nhau, thuận tiện khi xử lý
- B. Để không cần thực hiện phép tính
- C. Để mọi phân số tự động có mẫu số bằng `1`
- D. Để chương trình không cần khai báo biến

**Đáp án đúng:** A

**### 6.q20 | medium | multiple_choice**

**Câu hỏi:** Khi thực hiện phép trừ hai phân số có mẫu số khác nhau, cách xử lý nào đúng về mặt toán học?

- A. Trừ riêng tử số và giữ nguyên một mẫu số bất kỳ
- B. Quy đồng mẫu số trước khi thực hiện phép trừ
- C. Cộng hai mẫu số rồi bỏ qua tử số
- D. Chỉ lấy hiệu hai mẫu số

**Đáp án đúng:** B

**### 6.q21 | medium | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý sinh viên, vì sao nên dùng cùng một kiểu cấu trúc cho nhiều sinh viên?

- A. Để các đối tượng sinh viên có cùng cách tổ chức thông tin
- B. Để mỗi sinh viên bắt buộc có điểm giống nhau
- C. Để không cần nhập mã số
- D. Để loại bỏ hoàn toàn việc sử dụng biến

**Đáp án đúng:** A

**### 6.q22 | medium | code**

**Câu hỏi:** Câu lệnh nào thay đổi giá của cuốn sách `s` thành `50000`?

```cpp
struct Sach {
    string tenSach;
    int gia;
};

Sach s;
```

- A. `s.gia = 50000;`
- B. `s.tenSach = 50000;`
- C. `Sach.gia = 50000;`
- D. `gia.s = 50000;`

**Đáp án đúng:** A

**## Nhóm 3: Khó**

**### 6.q23 | hard | code**

**Câu hỏi:** Phân số nào được biểu diễn sau khi thực hiện đoạn code?

```cpp
struct PhanSo {
    int tu;
    int mau;
};

PhanSo p;
p.tu = 3;
p.mau = 4;
```

- A. `4/3`
- B. `3/4`
- C. `3 + 4`
- D. `3 - 4`

**Đáp án đúng:** B

**### 6.q24 | hard | multiple_choice**

**Câu hỏi:** Kết quả của phép trừ hai phân số \(1/2 - 1/3\) là gì?

- A. \(0/5\)
- B. \(1/6\)
- C. \(2/5\)
- D. \(1/5\)

**Đáp án đúng:** B

**### 6.q25 | hard | multiple_choice**

**Câu hỏi:** Một chương trình quản lý sách cần lưu mã sách, tên sách và giá bán. Cách thiết kế nào đáp ứng đúng mục tiêu tổ chức dữ liệu?

- A. Khai báo một cấu trúc có các thành phần tương ứng với ba thông tin
- B. Chỉ khai báo một biến số nguyên cho toàn bộ dữ liệu
- C. Chỉ lưu giá bán và bỏ qua các thông tin khác
- D. Khai báo ba hàm nhưng không có biến lưu dữ liệu

**Đáp án đúng:** A

**### 6.q26 | hard | multiple_choice**

**Câu hỏi:** Một chương trình cần lưu mã số và điểm của từng sinh viên. Vì sao kiểu cấu trúc phù hợp hơn việc chỉ dùng một biến số nguyên?

- A. Vì cấu trúc có thể nhóm nhiều thành phần dữ liệu liên quan
- B. Vì biến số nguyên không thể lưu bất kỳ số nào
- C. Vì cấu trúc tự động nhập dữ liệu từ bàn phím
- D. Vì cấu trúc tự động tính điểm trung bình

**Đáp án đúng:** A

**### 6.q27 | hard | multiple_choice**

**Câu hỏi:** Khi xây dựng chương trình tính thương hai phân số, điều kiện nào cần được kiểm tra trước khi thực hiện phép chia?

- A. Tử số của phân số thứ nhất phải bằng `1`
- B. Phân số thứ hai phải khác `0`
- C. Hai tử số phải bằng nhau
- D. Hai mẫu số phải bằng nhau

**Đáp án đúng:** B

**### 6.q28 | hard | multiple_choice**

**Câu hỏi:** Trong chương trình quản lý sinh viên, mỗi biến cấu trúc có thành phần `diem`. Muốn tính tổng điểm của nhiều sinh viên, cách tiếp cận nào phù hợp?

- A. Truy cập thành phần `diem` của từng sinh viên và cộng các giá trị
- B. Cộng tên các biến cấu trúc
- C. Cộng các mã số thay cho điểm
- D. Chỉ lấy điểm của sinh viên đầu tiên trong mọi trường hợp

**Đáp án đúng:** A

**### 6.q29 | hard | multiple_choice**

**Câu hỏi:** Khi thiết kế kiểu cấu trúc để quản lý một đối tượng thực tế, nguyên tắc nào nên được ưu tiên?

- A. Chọn các thành phần dữ liệu phù hợp với thông tin cần quản lý
- B. Khai báo càng nhiều thành phần không liên quan càng tốt
- C. Dùng cùng một kiểu dữ liệu cho mọi thông tin dù không phù hợp
- D. Không cần đặt tên cho các thành phần

**Đáp án đúng:** A

**### 6.q30 | hard | multiple_choice**

**Câu hỏi:** Một chương trình quản lý nhiều cuốn sách, mỗi cuốn có mã, tên và giá. Cách tổ chức nào thuận tiện nhất để mỗi cuốn sách có đủ thông tin riêng?

- A. Dùng một kiểu cấu trúc `Sach` và tạo các biến hoặc phần tử dữ liệu kiểu đó cho từng cuốn
- B. Chỉ dùng một biến lưu giá cho tất cả cuốn sách
- C. Dùng một biến lưu tên sách và bỏ mã, giá
- D. Khai báo lại toàn bộ chương trình cho từng cuốn sách

**Đáp án đúng:** A