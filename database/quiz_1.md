---
chapter_id:1
quiz_title: "Quiz Chương 1: Tổng quan về ngôn ngữ lập trình C++"
total_questions: 30
pass_threshold: 70
---

## Nhóm 1: Dễ

### 1.q01 | easy | multiple_choice

**Câu hỏi:** Bộ dịch nào dùng để chuyển ngôn ngữ hợp ngữ (assembly) sang ngôn ngữ máy?

- A. Compiler
- B. Assembler
- C. Interpreter
- D. Flowchart

**Đáp án đúng:** B

### 1.q02 | easy | multiple_choice

**Câu hỏi:** Trong lưu đồ giải thuật (Flowchart), hình thoi được sử dụng để biểu diễn thao tác nào?

- A. Bắt đầu hoặc kết thúc giải thuật
- B. Nhập hoặc xuất dữ liệu
- C. Lựa chọn (kiểm tra điều kiện)
- D. Thực hiện phép gán tính toán

**Đáp án đúng:** C

### 1.q03 | easy | multiple_choice

**Câu hỏi:** Tổ hợp phím tắt nào trong môi trường Dev-C++ dùng để biên dịch (Compile) chương trình nguồn nhằm kiểm tra lỗi cú pháp?

- A. `Ctrl + F9`
- B. `Ctrl + F10`
- C. `Alt + F4`
- D. `Ctrl + S`

**Đáp án đúng:** A

### 1.q04 | easy | multiple_choice

**Câu hỏi:** Mọi câu lệnh đơn trong ngôn ngữ lập trình C++ đều phải kết thúc bằng ký hiệu nào?

- A. Dấu hai chấm `:`
- B. Dấu chấm `.`
- C. Dấu chấm phẩy `;`
- D. Dấu phẩy `,`

**Đáp án đúng:** C

### 1.q05 | easy | multiple_choice

**Câu hỏi:** Kiểu dữ liệu `double` trong C++ có kích thước bao nhiêu byte trên hệ thống PC thông dụng theo giáo trình?

- A. 2 bytes
- B. 4 bytes
- C. 8 bytes
- D. 10 bytes

**Đáp án đúng:** C

### 1.q06 | easy | multiple_choice

**Câu hỏi:** Hằng ký tự điều khiển nào dùng để phát ra tiếng chuông ('bíp') khi xuất ra màn hình?

- A. `'\n'`
- B. `'\t'`
- C. `'\a'`
- D. `'\r'`

**Đáp án đúng:** C

### 1.q07 | easy | code

**Câu hỏi:** Đoạn code dưới đây in ra kết quả gì?

```cpp
int a = 13, b = 5;
cout << a % b;
```

- A. `2`
- B. `2.6`
- C. `3`
- D. `5`

**Đáp án đúng:** C

### 1.q08 | easy | code

**Câu hỏi:** Sau khi thực hiện đoạn code sau, biến `n` có giá trị bằng bao nhiêu?

```cpp
int n = 10;
n /= 2;
```

- A. `20`
- B. `12`
- C. `8`
- D. `5`

**Đáp án đúng:** D

### 1.q09 | easy | multiple_choice

**Câu hỏi:** Hàm nào trong thư viện `<math.h>` dùng để tính căn bậc hai của một số không âm `x`?

- A. `pow(x, 2)`
- B. `sqrt(x)`
- C. `exp(x)`
- D. `fabs(x)`

**Đáp án đúng:** B

### 1.q10 | easy | multiple_choice

**Câu hỏi:** Hàm nào trong thư viện `<ctype.h>` dùng để kiểm tra một ký tự `kt` có phải là chữ số thập phân (`'0'..'9'`) hay không?

- A. `isalpha(kt)`
- B. `isdigit(kt)`
- C. `isspace(kt)`
- D. `isupper(kt)`

**Đáp án đúng:** B

## Nhóm 2: Trung bình

### 1.q11 | medium | multiple_choice

**Câu hỏi:** Khi nhập hai biến `cin >> cd >> cr;`, người dùng có thể ngăn cách hai giá trị nhập vào bằng phím nào sau đây (được gọi chung là dấu trắng)?

- A. Phím dấu phẩy `,` hoặc dấu chấm phẩy `;`
- B. Phím Spacebar (dấu cách), phím Tab hoặc phím Enter
- C. Chỉ duy nhất phím Enter
- D. Phím gạch ngang `-` hoặc dấu hai chấm `:`

**Đáp án đúng:** B

### 1.q12 | medium | code

**Câu hỏi:** Sau khi chạy đoạn chương trình dưới đây, biến `k` có giá trị bao nhiêu?

```cpp
int i = 2;
int k = (i + 5) * 4;
```

- A. `22`
- B. `28`
- C. `14`
- D. `20`

**Đáp án đúng:** B

### 1.q13 | medium | code

**Câu hỏi:** Đoạn lệnh sau in ra kết quả gì?

```cpp
int i = 2;
int n = 3 + (i = 4);
cout << i << " " << n;
```

- A. `2 5`
- B. `4 7`
- C. `4 5`
- D. `2 7`

**Đáp án đúng:** B

### 1.q14 | medium | code

**Câu hỏi:** Cho đoạn code sau, giá trị của `i` và `j` sau khi thực hiện là bao nhiêu?

```cpp
int i = 3, j = 15;
j = i++ + 5;
```

- A. `i = 4, j = 9`
- B. `i = 4, j = 8`
- C. `i = 3, j = 8`
- D. `i = 3, j = 9`

**Đáp án đúng:** B

### 1.q15 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình giá trị bao nhiêu?

```cpp
int x = (3 + 4 < 7) ? 10 : 20;
cout << x;
```

- A. `7`
- B. `10`
- C. `20`
- D. `0`

**Đáp án đúng:** C

### 1.q16 | medium | code

**Câu hỏi:** Điền hàm toán học thích hợp vào chỗ trống để tính giá trị $x^y$ (với `x`, `y` là hai số thực):

```cpp
double kq = ___(x, y);
```

**Đáp án đúng:** `pow`

### 1.q17 | medium | multiple_choice

**Câu hỏi:** Theo sơ đồ chuyển kiểu tự động trong C++, chiều chuyển đổi nào sau đây được thực hiện tự động từ thấp lên cao?

- A. `double -> float -> long int -> int`
- B. `int -> long int -> float -> double`
- C. `float -> int -> char`
- D. `double -> int -> float`

**Đáp án đúng:** B

### 1.q18 | medium | code

**Câu hỏi:** Đoạn code sau in ra kết quả gì?

```cpp
float x = 5.89;
cout << int(x);
```

- A. `6`
- B. `5.89`
- C. `5`
- D. `0`

**Đáp án đúng:** C

### 1.q19 | medium | multiple_choice

**Câu hỏi:** Hàm nào trong thư viện `<ctype.h>` dùng để chuyển đổi một chuỗi ký tự số (ví dụ `"123"`) sang giá trị số nguyên kiểu `int`?

- A. `atof(s)`
- B. `atoi(s)`
- C. `atol(s)`
- D. `tolower(s)`

**Đáp án đúng:** B

### 1.q20 | medium | code

**Câu hỏi:** Điền tên phương thức vào chỗ trống để quy định độ rộng vùng in cho số `123` là 10 cột màn hình:

```cpp
cout << ___(10) << 123;
```

**Đáp án đúng:** `setw`

## Nhóm 3: Khó

### 1.q21 | hard | code

**Câu hỏi:** Cho đoạn code sau, giá trị của `x`, `i`, `j` sau khi thực hiện là bao nhiêu?

```cpp
int i = 2, j = 3;
int x = (++i < 4 && ++j > 5);
```

- A. `x = 0, i = 3, j = 4`
- B. `x = 0, i = 2, j = 4`
- C. `x = 1, i = 3, j = 4`
- D. `x = 0, i = 3, j = 3`

**Đáp án đúng:** A

### 1.q22 | hard | code

**Câu hỏi:** Cho đoạn code sau, giá trị của biến `x` sau khi thực hiện là bao nhiêu?

```cpp
int x = (3 - 3) ? 100 : 200;
```

- A. `0`
- B. `3`
- C. `100`
- D. `200`

**Đáp án đúng:** D

### 1.q23 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a = 5, b = 13;
cout << a / b << " " << a % b;
```

- A. `0 5`
- B. `2 3`
- C. `0 13`
- D. `0.38 5`

**Đáp án đúng:** A

### 1.q24 | hard | code

**Câu hỏi:** Điền biểu thức vào chỗ trống để hoán đổi giá trị hai biến nguyên `a` và `b` mà không dùng biến phụ:

```cpp
a = a + b;
b = ___;
a = a - b;
```

**Đáp án đúng:** `a - b`

### 1.q25 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì (biết mã ASCII của `'a'` là 97, `'A'` là 65)?

```cpp
char c = 'a';
cout << char(toupper(c) + 1);
```

- A. `b`
- B. `B`
- C. `66`
- D. `98`

**Đáp án đúng:** B

### 1.q26 | hard | code

**Câu hỏi:** Cho số nguyên `n = 3185`. Biểu thức `n / 1000` và `n % 10` lần lượt cho kết quả là gì?

```cpp
int n = 3185;
cout << n / 1000 << " " << n % 10;
```

- A. `3 5`
- B. `318 5`
- C. `3 85`
- D. `5 3`

**Đáp án đúng:** A

### 1.q27 | hard | code

**Câu hỏi:** Đoạn chương trình sau in ra kết quả gì?

```cpp
int i = 5, j = 5;
int p = ++i * 2;
int q = j++ * 2;
cout << p << " " << q;
```

- A. `10 10`
- B. `12 12`
- C. `12 10`
- D. `10 12`

**Đáp án đúng:** C

### 1.q28 | hard | code

**Câu hỏi:** Cho `int n = 16; float x = sqrt(n);`. Điền điều kiện kiểm tra vào chỗ trống để xác định `x` là số nguyên (tức `n` là số chính phương):

```cpp
if (___ == x)
    cout << "So chinh phuong";
```

**Đáp án đúng:** `int(x)`

### 1.q29 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a = 1, b = 2, c = 3;
int kq = (a < b || ++c > 10);
cout << kq << " " << c;
```

- A. `1 4`
- B. `1 3`
- C. `0 4`
- D. `0 3`

**Đáp án đúng:** B

### 1.q30 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int x = 13, y = 5;
double z = (double)(x / y) + x % y;
cout << z;
```

- A. `5.6`
- B. `5`
- C. `2.6`
- D. `6`

**Đáp án đúng:** B
