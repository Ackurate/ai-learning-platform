---
chapter_id:2
quiz_title: "Quiz Chương 2: Các cấu trúc điều khiển"
total_questions: 30
pass_threshold: 70
---

## Nhóm 1: Dễ

### 2.q01 | easy | multiple_choice

**Câu hỏi:** Trong câu lệnh `if (điều_kiện)`, nếu `điều_kiện` nhận giá trị `0` thì C++ hiểu điều kiện đó là gì?

- A. Đúng (`true`)
- B. Sai (`false`)
- C. Lỗi cú pháp
- D. Vô định

**Đáp án đúng:** B

### 2.q02 | easy | multiple_choice

**Câu hỏi:** Khi khối lệnh của `if`, `for`, hoặc `while` có từ 2 câu lệnh trở lên, ta bắt buộc phải đặt chúng trong cặp dấu nào?

- A. Ngoặc đơn `( )`
- B. Ngoặc vuông `[ ]`
- C. Ngoặc móc `{ }`
- D. Nháy kép `" "`

**Đáp án đúng:** C

### 2.q03 | easy | multiple_choice

**Câu hỏi:** Trong cấu trúc `switch`, nhánh nào sẽ được thực hiện khi giá trị biểu thức điều khiển không khớp với bất kỳ nhánh `case` nào?

- A. `else`
- B. `break`
- C. `default`
- D. `continue`

**Đáp án đúng:** C

### 2.q04 | easy | multiple_choice

**Câu hỏi:** Câu lệnh nào dùng để thoát ngay ra khỏi cấu trúc `switch` hoặc vòng lặp chứa nó?

- A. `continue;`
- B. `break;`
- C. `else;`
- D. `default;`

**Đáp án đúng:** B

### 2.q05 | easy | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a = 8, b = 12;
int max = a;
if (b > max) max = b;
cout << max;
```

- A. `8`
- B. `12`
- C. `20`
- D. `0`

**Đáp án đúng:** B

### 2.q06 | easy | code

**Câu hỏi:** Vòng lặp `for` dưới đây thực hiện in chữ `"Xin chao"` bao nhiêu lần?

```cpp
for (int i = 1; i <= 4; i++)
    cout << "Xin chao ";
```

- A. 3 lần
- B. 4 lần
- C. 5 lần
- D. 0 lần

**Đáp án đúng:** B

### 2.q07 | easy | code

**Câu hỏi:** Đoạn code dưới đây in ra kết quả gì?

```cpp
int x = 10;
while (x < 5) {
    x = x + 1;
}
cout << x;
```

- A. `5`
- B. `10`
- C. `11`
- D. Lặp vô tận

**Đáp án đúng:** B

### 2.q08 | easy | code

**Câu hỏi:** Đoạn code dưới đây in ra kết quả gì?

```cpp
int x = 10;
do {
    x = x + 1;
} while (x < 5);
cout << x;
```

- A. `5`
- B. `10`
- C. `11`
- D. Lặp vô tận

**Đáp án đúng:** C

### 2.q09 | easy | multiple_choice

**Câu hỏi:** Trong câu lệnh `for (dãy_biểu_thức_1; điều_kiện_lặp; dãy_biểu_thức_2)`, các biểu thức bên trong `dãy_biểu_thức_1` (nếu có nhiều biểu thức) được phân cách với nhau bởi dấu gì?

- A. Dấu chấm phẩy `;`
- B. Dấu phẩy `,`
- C. Dấu hai chấm `:`
- D. Dấu chấm `.`

**Đáp án đúng:** B

### 2.q10 | easy | multiple_choice

**Câu hỏi:** Lệnh `continue;` chỉ được phép đặt ở đâu trong chương trình C++?

- A. Bên trong cấu trúc `if...else` bất kỳ
- B. Bên trong cấu trúc `switch`
- C. Bên trong thân của các vòng lặp (`for`, `while`, `do...while`)
- D. Ở đầu hàm `main()`

**Đáp án đúng:** C

## Nhóm 2: Trung bình

### 2.q11 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int n = 2000;
if (n % 4 == 0 && n % 100 != 0 || n % 400 == 0)
    cout << "Nam nhuan";
else
    cout << "Khong nhuan";
```

- A. `Nam nhuan`
- B. `Khong nhuan`
- C. Không in gì cả
- D. Lỗi biên dịch

**Đáp án đúng:** A

### 2.q12 | medium | code

**Câu hỏi:** Đoạn code sau in ra kết quả gì?

```cpp
char pt = '*';
int a = 6, b = 3, kq = 0;
switch (pt) {
    case '+': kq = a + b; break;
    case '-': kq = a - b; break;
    case 'x': case '.': case '*': kq = a * b; break;
    default: kq = -1;
}
cout << kq;
```

- A. `9`
- B. `3`
- C. `18`
- D. `-1`

**Đáp án đúng:** C

### 2.q13 | medium | code

**Câu hỏi:** Sau khi thực hiện đoạn code sau, biến `s` có giá trị bằng bao nhiêu?

```cpp
int s = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    s += i;
}
```

- A. `15`
- B. `12`
- C. `3`
- D. `6`

**Đáp án đúng:** B

### 2.q14 | medium | code

**Câu hỏi:** Sau khi thực hiện đoạn code sau, biến `s` có giá trị bằng bao nhiêu?

```cpp
int s = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) break;
    s += i;
}
```

- A. `15`
- B. `12`
- C. `3`
- D. `6`

**Đáp án đúng:** C

### 2.q15 | medium | code

**Câu hỏi:** Đoạn code sau in ra kết quả gì?

```cpp
int n = 6, i;
if (n % 2 == 0) i = n - 1;
else i = n - 2;
for ( ; i >= 1; i = i - 2)
    cout << i << " ";
```

- A. `6 4 2 `
- B. `5 3 1 `
- C. `4 2 `
- D. `5 4 3 2 1 `

**Đáp án đúng:** B

### 2.q16 | medium | code

**Câu hỏi:** Điền từ khóa thích hợp vào chỗ trống để hoàn thành cấu trúc lặp kiểm tra điều kiện sau:

```cpp
int i = 1;
do {
    i++;
} ___ (i <= 5);
```

**Đáp án đúng:** `while`

### 2.q17 | medium | code

**Câu hỏi:** Đoạn chương trình dưới đây in ra kết quả gì?

```cpp
int dem = 0;
for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 2; j++)
        dem++;
cout << dem;
```

- A. `3`
- B. `5`
- C. `6`
- D. `9`

**Đáp án đúng:** C

### 2.q18 | medium | code

**Câu hỏi:** Trong bài toán tính tổng $S = \sum_{i=1}^{n} \frac{1}{i}$, điền biểu thức thích hợp vào chỗ trống để kết quả phép chia không bị mất phần thập phân (với `i` kiểu `int` và `kq` kiểu `float`):

```cpp
for (int i = 1; i <= n; i++)
    kq += ___ / i;
```

**Đáp án đúng:** `1.0`

### 2.q19 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình giá trị bao nhiêu?

```cpp
int a = 24, b = 16;
while (a != b) {
    if (a > b) a = a - b;
    else b = b - a;
}
cout << a;
```

- A. `4`
- B. `8`
- C. `16`
- D. `2`

**Đáp án đúng:** B

### 2.q20 | medium | multiple_choice

**Câu hỏi:** Khi lệnh `continue` xuất hiện bên trong vòng lặp `for` mà vòng lặp `for` đó lại nằm bên trong một vòng lặp `while`, thì lệnh `continue` tác động lên vòng lặp nào?

- A. Chỉ tác động trực tiếp lên vòng lặp `for` gần nó nhất
- B. Chỉ tác động lên vòng lặp `while` bên ngoài
- C. Tác động đồng thời lên cả hai vòng lặp `for` và `while`
- D. Thoát khỏi cả hai vòng lặp ngay lập tức

**Đáp án đúng:** A

## Nhóm 3: Khó

### 2.q21 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int x = 2, y = 0;
switch (x) {
    case 1: y += 1;
    case 2: y += 2;
    case 3: y += 3;
    default: y += 4;
}
cout << y;
```

- A. `2`
- B. `5`
- C. `9`
- D. `10`

**Đáp án đúng:** C

### 2.q22 | hard | code

**Câu hỏi:** Trong bài toán cổ "Vừa gà vừa chó, bó lại cho tròn, 36 con, 100 chân chẵn", số gà `g` và số chó `c` tìm được từ điều kiện `g + c == 36 && 2 * g + 4 * c == 100` là bao nhiêu?

```cpp
for (int g = 0; g <= 50; g++)
    for (int c = 0; c <= 25; c++)
        if (g + c == 36 && 2 * g + 4 * c == 100)
            cout << g << " " << c;
```

- A. `22 14`
- B. `14 22`
- C. `20 16`
- D. `18 18`

**Đáp án đúng:** A

### 2.q23 | hard | code

**Câu hỏi:** Đoạn code kiểm tra số nguyên tố dưới đây sẽ in ra gì khi `n = 9`?

```cpp
int n = 9, i = 1;
do {
    i++;
} while (i <= n / 2 && n % i != 0);
if (i > n / 2)
    cout << "Nguyen to";
else
    cout << "Hop so (" << i << ")";
```

- A. `Nguyen to`
- B. `Hop so (2)`
- C. `Hop so (3)`
- D. `Hop so (4)`

**Đáp án đúng:** C

### 2.q24 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int s = 0, i = 1;
while (i <= 6) {
    if (i % 3 == 0)
        s -= i;
    else
        s += i;
    i++;
}
cout << s;
```

- A. `21`
- B. `3`
- C. `9`
- D. `-3`

**Đáp án đúng:** B

### 2.q25 | hard | code

**Câu hỏi:** Đoạn code sau đây in ra giá trị bao nhiêu?

```cpp
int i = 0, dem = 0;
for ( ; ; ) {
    i++;
    if (i % 2 == 0) continue;
    if (i > 5) break;
    dem++;
}
cout << dem;
```

- A. `2`
- B. `3`
- C. `5`
- D. `6`

**Đáp án đúng:** B

### 2.q26 | hard | code

**Câu hỏi:** Đoạn code sau in ra kết quả gì?

```cpp
int a = 5, b = 3, c = 8;
if (a > b)
    if (b > c)
        cout << "Nhanh 1";
    else
        cout << "Nhanh 2";
else
    cout << "Nhanh 3";
```

- A. `Nhanh 1`
- B. `Nhanh 2`
- C. `Nhanh 3`
- D. Không in gì cả

**Đáp án đúng:** B

### 2.q27 | hard | code

**Câu hỏi:** Cho đoạn code đổi 100$ ra các tờ 10$, 20$ và 50$. Biến `sopa` sau khi chạy xong có giá trị bằng bao nhiêu?

```cpp
int sopa = 0;
for (int st10 = 0; st10 <= 10; st10++)
    for (int st20 = 0; st20 <= 5; st20++)
        for (int st50 = 0; st50 <= 2; st50++)
            if (st10 * 10 + st20 * 20 + st50 * 50 == 100)
                sopa++;
cout << sopa;
```

- A. `8`
- B. `9`
- C. `10`
- D. `12`

**Đáp án đúng:** C

### 2.q28 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int n = 4, tich = 1;
for (int i = 1; i <= n; i++);
    tich = tich * 2;
cout << tich;
```

- A. `16`
- B. `8`
- C. `2`
- D. `1`

**Đáp án đúng:** C

### 2.q29 | hard | code

**Câu hỏi:** Điền nhãn thích hợp vào chỗ trống để lệnh `goto` nhảy tới dòng lệnh kết thúc `kt:` khi mẫu số `b == 0`:

```cpp
if (b == 0) {
    cout << "Khong chia duoc";
    goto ___;
}
kt: return 0;
```

**Đáp án đúng:** `kt`

### 2.q30 | hard | code

**Câu hỏi:** Đoạn code sau in ra kết quả gì?

```cpp
int x = 1;
do {
    x *= 2;
    if (x == 4) continue;
    x += 1;
} while (x < 6);
cout << x;
```

- A. `6`
- B. `7`
- C. `8`
- D. `9`

**Đáp án đúng:** B
