---
chapter_id:4
quiz_title: "Quiz Chương 4: Dữ liệu kiểu chuỗi"
total_questions: 30
pass_threshold: 70
---

## Nhóm 1: Dễ

### 4.q01 | easy | multiple_choice

**Câu hỏi:** Theo quy ước của C++, ký tự kết thúc một chuỗi ký tự trong mảng `char` là ký tự nào?

- A. `'\n'`
- B. `'\t'`
- C. `'\0'`
- D. `' '`

**Đáp án đúng:** C

### 4.q02 | easy | multiple_choice

**Câu hỏi:** Chuỗi rỗng `""` (không có ký tự nội dung nào) khi lưu trong mảng ký tự chiếm tối thiểu bao nhiêu ô nhớ?

- A. 0 ô nhớ
- B. 1 ô nhớ (chứa ký tự kết thúc chuỗi `'\0'`)
- C. 2 ô nhớ
- D. 8 ô nhớ

**Đáp án đúng:** B

### 4.q03 | easy | code

**Câu hỏi:** Với khai báo `char thang[] = "Muoi hai";`, trình biên dịch sẽ cấp phát mảng `thang` có độ dài (số phần tử) là bao nhiêu?

```cpp
char thang[] = "Muoi hai";
```

- A. 7
- B. 8
- C. 9
- D. 10

**Đáp án đúng:** C

### 4.q04 | easy | code

**Câu hỏi:** Đoạn code sau in ra màn hình ký tự gì?

```cpp
char s[50] = "Viet Nam";
cout << s[0];
```

- A. `V`
- B. `i`
- C. `Viet Nam`
- D. `m`

**Đáp án đúng:** A

### 4.q05 | easy | multiple_choice

**Câu hỏi:** Khi dùng lệnh `cin >> s;` để nhập chuỗi và người dùng gõ `"Tin hoc"` rồi nhấn Enter, biến chuỗi `s` sẽ lưu giá trị gì?

- A. `"Tin hoc"`
- B. `"Tin"`
- C. `"hoc"`
- D. `"Tinhoc"`

**Đáp án đúng:** B

### 4.q06 | easy | multiple_choice

**Câu hỏi:** Hàm nào trong thư viện `<string.h>` trả về độ dài thực sự của chuỗi `s` (không kể ký tự kết thúc chuỗi `'\0'`)?

- A. `strcpy(s)`
- B. `strlen(s)`
- C. `strupr(s)`
- D. `strlwr(s)`

**Đáp án đúng:** B

### 4.q07 | easy | multiple_choice

**Câu hỏi:** Hàm nào trong thư viện `<string.h>` dùng để đổi toàn bộ chuỗi `s` thành chữ in hoa?

- A. `strlwr(s)`
- B. `strupr(s)`
- C. `strcmp(s)`
- D. `strcat(s)`

**Đáp án đúng:** B

### 4.q08 | easy | multiple_choice

**Câu hỏi:** Hàm nào dùng để sao chép toàn bộ nội dung của chuỗi `t` (kể cả ký tự `'\0'`) sang chuỗi `s`?

- A. `strcat(s, t)`
- B. `strcmp(s, t)`
- C. `strcpy(s, t)`
- D. `strlen(s)`

**Đáp án đúng:** C

### 4.q09 | easy | multiple_choice

**Câu hỏi:** Hàm nào dùng để ghép (nối) một bản sao của chuỗi `t` vào phía sau chuỗi `s`?

- A. `strcpy(s, t)`
- B. `strcat(s, t)`
- C. `strcmp(s, t)`
- D. `strcmpi(s, t)`

**Đáp án đúng:** B

### 4.q10 | easy | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10] = "Ha Noi";
cout << strlen(s);
```

- A. `5`
- B. `6`
- C. `7`
- D. `10`

**Đáp án đúng:** B

## Nhóm 2: Trung bình

### 4.q11 | medium | multiple_choice

**Câu hỏi:** Cho khai báo `char s[20] = "Hello", t[20];`. Câu lệnh nào sau đây là HỢP LỆ trong C++ để gán nội dung của `s` sang `t`?

- A. `t = s;`
- B. `t = "Hello";`
- C. `strcpy(t, s);`
- D. `s == t;`

**Đáp án đúng:** C

### 4.q12 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10], t[10] = "Steven";
strncpy(s, t, 5);
s[5] = '\0';
cout << s;
```

- A. `Steven`
- B. `Steve`
- C. `Stev`
- D. `even`

**Đáp án đúng:** B

### 4.q13 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10], t[10] = "Steven";
strncpy(s, t + 2, 4);
s[4] = '\0';
cout << s;
```

- A. `Stev`
- B. `teve`
- C. `even`
- D. `ven`

**Đáp án đúng:** C

### 4.q14 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char a[40] = "Thanh", b[10] = "Minh";
strcat(strcat(a, " va "), b);
cout << a;
```

- A. `ThanhMinh`
- B. `Thanh va Minh`
- C. ` va Minh`
- D. `Minh va Thanh`

**Đáp án đúng:** B

### 4.q15 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[] = "Ha Noi", t[] = "Ha noi";
cout << strncmp(s, t, 3);
```

- A. `-1`
- B. `0`
- C. `1`
- D. `3`

**Đáp án đúng:** B

### 4.q16 | medium | code

**Câu hỏi:** Điền tên hàm thích hợp vào chỗ trống để so sánh hai chuỗi `pw` và `"VinhLong2013"` có phân biệt chữ hoa, chữ thường:

```cpp
if (___(pw, "VinhLong2013") == 0)
    cout << "Dung roi. Moi vao!";
```

**Đáp án đúng:** `strcmp`

### 4.q17 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10] = "Ha Noi";
strlwr(s);
cout << s;
```

- A. `HA NOI`
- B. `Ha Noi`
- C. `ha noi`
- D. `hA nOI`

**Đáp án đúng:** C

### 4.q18 | medium | code

**Câu hỏi:** Cho mảng ký tự `s` chứa chuỗi `"HELLO\0WORLD"`. Hàm `strlen(s)` trả về giá trị bao nhiêu?

```cpp
char s[15] = {'H','E','L','L','O','\0','W','O','R','L','D','\0'};
cout << strlen(s);
```

- A. `5`
- B. `10`
- C. `11`
- D. `15`

**Đáp án đúng:** A

### 4.q19 | medium | multiple_choice

**Câu hỏi:** Trong chương trình nhập mật khẩu (Chương 4), vì sao người ta dùng hàm `getch()` trong thư viện `<conio.h>` để nhập từng ký tự của mật khẩu rồi in ra `'X'`?

- A. Vì `getch()` tự động mã hóa chuỗi mật khẩu sang hệ nhị phân
- B. Vì `getch()` đọc ký tự từ bàn phím mà không hiển thị ký tự đó lên màn hình, giúp che giấu mật khẩu
- C. Vì `getch()` đọc được cả một chuỗi dài trong một lần gọi hàm
- D. Vì `getch()` tự động so sánh mật khẩu với chuỗi gốc

**Đáp án đúng:** B

### 4.q20 | medium | code

**Câu hỏi:** Đoạn code sau thống kê gì trên chuỗi `s`?

```cpp
int dc = 0, ds = 0, dt = 0;
for (int i = 0; i < strlen(s); i++)
    if (isalpha(s[i])) dc++;
    else if (isdigit(s[i])) ds++;
    else if (s[i] == ' ') dt++;
```

- A. Đếm số chữ hoa, chữ thường và chữ số
- B. Đếm số chữ cái, số chữ số và số khoảng trắng
- C. Đếm số từ, số câu và số khoảng trắng
- D. Đổi chữ thường thành chữ hoa trong chuỗi `s`

**Đáp án đúng:** B

## Nhóm 3: Khó

### 4.q21 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10], t[10] = "Steve";
strncpy(s, t, 3);
s[3] = '\0';
strcat(s, "p");
cout << s;
```

- A. `Stevep`
- B. `Step`
- C. `Ste`
- D. `Stp`

**Đáp án đúng:** B

### 4.q22 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[20] = "Khoa ";
char t[] = "cong nghe thong tin";
strncat(s, t + 10, 9);
cout << s;
```

- A. `Khoa cong nghe`
- B. `Khoa thong tin`
- C. `cong nghe thong tin`
- D. `Khoa nghe thong`

**Đáp án đúng:** B

### 4.q23 | hard | code

**Câu hỏi:** Trong chương trình thống kê chữ số xuất hiện nhiều nhất trong chuỗi `st` (mục 4.6.3 giáo trình), khi `isdigit(st[i])` đúng, biểu thức `(int)st[i] - 48` dùng để làm gì?

```cpp
if (isdigit(st[i]))
    a[(int)st[i] - 48] = a[(int)st[i] - 48] + 1;
```

- A. Chuyển ký tự chữ số `'0'..'9'` (mã ASCII từ 48 đến 57) thành giá trị số nguyên `0..9` tương ứng để làm chỉ số mảng đếm `a`
- B. Đổi chữ thường sang chữ in hoa theo bảng mã ASCII
- C. Kiểm tra xem ký tự `st[i]` có phải là khoảng trắng hay không
- D. Xóa ký tự chữ số khỏi chuỗi `st`

**Đáp án đúng:** A

### 4.q24 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char st[20] = "Cntt2023";
int dkt = 0;
for (int i = 0; i < strlen(st); i++)
    if (isalpha(st[i]) == 0)
        dkt++;
cout << dkt;
```

- A. `4`
- B. `8`
- C. `0`
- D. `2`

**Đáp án đúng:** A

### 4.q25 | hard | code

**Câu hỏi:** Đoạn code dưới đây thực hiện thao tác gì trên chuỗi họ tên `ht`?

```cpp
int i = 0;
while (ht[i] == ' ') i++;
strncpy(tam, ht + i, strlen(ht) - i);
tam[strlen(ht) - i] = '\0';
```

- A. Cắt bỏ tất cả các khoảng trắng thừa ở đầu chuỗi `ht` và lưu vào `tam`
- B. Cắt bỏ tất cả các khoảng trắng thừa ở cuối chuỗi `ht`
- C. Tách lấy từ cuối cùng (tên) trong chuỗi `ht`
- D. Xóa toàn bộ khoảng trắng ở giữa các từ trong `ht`

**Đáp án đúng:** A

### 4.q26 | hard | code

**Câu hỏi:** Cho chuỗi `ht` đã được chuẩn hóa `"Nguyen Van Hieu"`. Đoạn code dưới đây sẽ in ra chuỗi `ten` có nội dung là gì?

```cpp
char ht[40] = "Nguyen Van Hieu", ten[10];
int i = strlen(ht) - 1;
while (ht[i] != ' ') i--;
strncpy(ten, ht + i + 1, strlen(ht) - 1 - i);
ten[strlen(ht) - 1 - i] = '\0';
cout << ten;
```

- A. `Nguyen`
- B. `Van Hieu`
- C. `Hieu`
- D. `Nguyen Van`

**Đáp án đúng:** C

### 4.q27 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[] = "THONG TIN", t[] = "CONG NGHE";
cout << strcmp(s, t);
```

- A. `-1`
- B. `0`
- C. `1`
- D. `9`

**Đáp án đúng:** C

### 4.q28 | hard | code

**Câu hỏi:** Trong chương trình nhập mật khẩu bằng `getch()`, người dùng kết thúc việc nhập mật khẩu bằng phím Enter (có mã ASCII là `13`). Điền ký tự cần gán vào chỗ trống khi `kt == 13` để đóng chuỗi mật khẩu `pw`:

```cpp
kt = getch();
if (kt != 13) pw[i] = kt;
else pw[i] = ___;
```

**Đáp án đúng:** `'\0'`

### 4.q29 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
char s[10] = "ABCD";
int n = strlen(s);
for (int i = 0; i < n / 2; i++) {
    char t = s[i];
    s[i] = s[n - 1 - i];
    s[n - 1 - i] = t;
}
cout << s;
```

- A. `ABCD`
- B. `DCBA`
- C. `ABBA`
- D. `CDDC`

**Đáp án đúng:** B

### 4.q30 | hard | code

**Câu hỏi:** Trong vòng lặp kiểm tra tính hợp lệ của chuỗi họ tên `ht` (chỉ gồm chữ cái `dc` và khoảng trắng `dt`, nhưng không được toàn là khoảng trắng), điều kiện lặp `do ... while (dc + dt != strlen(ht) || dc == 0);` sẽ yêu cầu nhập lại khi nào?

```cpp
do {
    cin.getline(ht, 40);
    dc = dt = 0;
    for (int i = 0; i < strlen(ht); i++)
        if (isalpha(ht[i])) dc++;
        else if (ht[i] == ' ') dt++;
} while (dc + dt != strlen(ht) || dc == 0);
```

- A. Khi chuỗi `ht` có chứa ký tự không phải chữ cái/khoảng trắng, hoặc chuỗi `ht` không có chữ cái nào (`dc == 0`)
- B. Khi chuỗi `ht` chỉ chứa toàn chữ cái và không có khoảng trắng nào
- C. Khi chuỗi `ht` có nhiều hơn 1 khoảng trắng
- D. Khi chuỗi `ht` có cả chữ hoa lẫn chữ thường

**Đáp án đúng:** A
