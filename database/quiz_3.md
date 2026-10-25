---
chapter_id:3
quiz_title: "Quiz Chương 3: Dữ liệu kiểu mảng"
total_questions: 30
pass_threshold: 70
---

## Nhóm 1: Dễ

### 3.q01 | easy | multiple_choice

**Câu hỏi:** Phát biểu nào sau đây mô tả đúng nhất về kiểu dữ liệu mảng (Array) trong C++?

- A. Tập hợp các phần tử có thể khác kiểu dữ liệu và nằm rải rác trong bộ nhớ
- B. Tập hợp các phần tử có cùng kiểu dữ liệu và được bố trí liên tục nhau trong bộ nhớ
- C. Một biến đơn dùng để lưu một ký tự duy nhất
- D. Tập hợp các hàm con trong chương trình

**Đáp án đúng:** B

### 3.q02 | easy | multiple_choice

**Câu hỏi:** Danh sách dữ liệu được lưu trữ bằng cấu trúc mảng trong thực tế còn được gọi là gì?

- A. Danh sách liên kết
- B. Danh sách đặc
- C. Danh sách phân tán
- D. Danh sách rỗng

**Đáp án đúng:** B

### 3.q03 | easy | multiple_choice

**Câu hỏi:** Trong mảng một chiều, chỉ số (vị trí) của phần tử đầu tiên luôn bắt đầu từ số mấy?

- A. `0`
- B. `1`
- C. `-1`
- D. Tùy người lập trình chọn

**Đáp án đúng:** A

### 3.q04 | easy | code

**Câu hỏi:** Cho khai báo mảng `int a[4] = {10, 20, 30, 40};`. Giá trị của `a[2]` là bao nhiêu?

```cpp
int a[4] = {10, 20, 30, 40};
cout << a[2];
```

- A. `10`
- B. `20`
- C. `30`
- D. `40`

**Đáp án đúng:** C

### 3.q05 | easy | multiple_choice

**Câu hỏi:** Cho mảng hai chiều `int A[3][4];`. Tổng số phần tử tối đa mà mảng `A` có thể lưu trữ là bao nhiêu?

- A. 7 phần tử
- B. 12 phần tử
- C. 34 phần tử
- D. 9 phần tử

**Đáp án đúng:** B

### 3.q06 | easy | multiple_choice

**Câu hỏi:** Trong bộ nhớ máy tính, các phần tử của mảng hai chiều được sắp xếp thực tế như thế nào?

- A. Sắp xếp liên tiếp theo từng hàng của mảng
- B. Sắp xếp ngẫu nhiên ở các vùng nhớ rời rạc
- C. Chỉ lưu phần tử đầu tiên và phần tử cuối cùng
- D. Lưu thành dạng bảng hai chiều vật lý trên đĩa cứng

**Đáp án đúng:** A

### 3.q07 | easy | multiple_choice

**Câu hỏi:** Để nhập dữ liệu cho mảng một chiều `int a[10];`, cách viết nào sau đây là ĐÚNG?

- A. `cin >> a;`
- B. `cin >> a[10];`
- C. Dùng vòng lặp `for (int i = 0; i < 10; i++) cin >> a[i];`
- D. `a = cin.get();`

**Đáp án đúng:** C

### 3.q08 | easy | code

**Câu hỏi:** Cho khai báo `int b[] = {5, 10, 15, 20, 25};`. Trình biên dịch sẽ tự động xác định số phần tử của mảng `b` là bao nhiêu?

```cpp
int b[] = {5, 10, 15, 20, 25};
```

- A. 4
- B. 5
- C. 6
- D. Báo lỗi vì không ghi số phần tử

**Đáp án đúng:** B

### 3.q09 | easy | code

**Câu hỏi:** Cho ma trận `int A[2][3] = {{1, 2, 3}, {4, 5, 6}};`. Giá trị của phần tử `A[1][0]` là bao nhiêu?

```cpp
int A[2][3] = {{1, 2, 3}, {4, 5, 6}};
cout << A[1][0];
```

- A. `1`
- B. `2`
- C. `4`
- D. `5`

**Đáp án đúng:** C

### 3.q10 | easy | multiple_choice

**Câu hỏi:** Đối với ma trận vuông `a` cấp `n`, các phần tử có chỉ số hàng bằng chỉ số cột (`i == j`) nằm ở vị trí nào của ma trận?

- A. Đường chéo phụ
- B. Đường chéo chính
- C. Cột đầu tiên
- D. Hàng cuối cùng

**Đáp án đúng:** B

## Nhóm 2: Trung bình

### 3.q11 | medium | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a[5] = {3, -2, 0, 7, -5};
int sd = 0;
for (int i = 0; i < 5; i++)
    if (a[i] > 0) sd++;
cout << sd;
```

- A. `1`
- B. `2`
- C. `3`
- D. `5`

**Đáp án đúng:** B

### 3.q12 | medium | code

**Câu hỏi:** Đoạn code sau tính tổng các phần tử là bội số của `k = 3` trong mảng `a`. Kết quả in ra là bao nhiêu?

```cpp
int a[5] = {6, 4, 9, 10, 3}, k = 3;
long s = 0;
for (int i = 0; i < 5; i++)
    if (a[i] % k == 0)
        s += a[i];
cout << s;
```

- A. `15`
- B. `18`
- C. `32`
- D. `19`

**Đáp án đúng:** B

### 3.q13 | medium | code

**Câu hỏi:** Đoạn code dưới đây tính tích các phần tử dương nằm ở vị trí (chỉ số) lẻ trong mảng `a`. Kết quả in ra là bao nhiêu?

```cpp
int a[5] = {2, 3, 4, 5, 6};
int tich = 1;
for (int i = 0; i < 5; i++)
    if (i % 2 != 0 && a[i] > 0)
        tich *= a[i];
cout << tich;
```

- A. `48`
- B. `15`
- C. `8`
- D. `12`

**Đáp án đúng:** B

### 3.q14 | medium | code

**Câu hỏi:** Khi biểu diễn hai phân số `a = 1/3` và `b = 3/5` bằng hai mảng `int a[2] = {1, 3}, b[2] = {3, 5}, tong[2];` (trong đó chỉ số `0` là tử số, chỉ số `1` là mẫu số), đoạn code sau in ra gì?

```cpp
int a[2] = {1, 3}, b[2] = {3, 5}, tong[2];
tong[0] = a[0] * b[1] + a[1] * b[0];
tong[1] = a[1] * b[1];
cout << tong[0] << "/" << tong[1];
```

- A. `4/8`
- B. `14/15`
- C. `3/15`
- D. `8/15`

**Đáp án đúng:** B

### 3.q15 | medium | code

**Câu hỏi:** Khi xóa phần tử tại vị trí `i` trong mảng một chiều `a` có `n` phần tử, điền biểu thức chỉ số vào chỗ trống để dời các phần tử phía sau lên trước 1 ô:

```cpp
for (int j = i; j <= n - 2; j++)
    a[j] = a[___];
n--;
```

**Đáp án đúng:** `j + 1`

### 3.q16 | medium | code

**Câu hỏi:** Cho khai báo `float A[][3] = {{1, 2}, {0}};`. Trình biên dịch xác định số hàng và số cột của mảng `A` lần lượt là bao nhiêu?

```cpp
float A[][3] = {{1, 2}, {0}};
```

- A. 2 hàng, 2 cột
- B. 2 hàng, 3 cột
- C. 3 hàng, 2 cột
- D. 3 hàng, 3 cột

**Đáp án đúng:** B

### 3.q17 | medium | code

**Câu hỏi:** Cho ma trận `a` dưới đây, đoạn code tính tích các phần tử khác `0` nằm trên cột `c = 1`. Kết quả in ra là bao nhiêu?

```cpp
int a[3][3] = {{2, 3, 1}, {4, 0, 5}, {6, 4, 2}};
int c = 1, t = 1;
for (int i = 0; i < 3; i++)
    if (a[i][c] != 0)
        t = t * a[i][c];
cout << t;
```

- A. `0`
- B. `12`
- C. `48`
- D. `20`

**Đáp án đúng:** B

### 3.q18 | medium | code

**Câu hỏi:** Để sắp xếp các phần tử nằm trên hàng `h` của ma trận `a` (có `m` hàng, `n` cột) theo thứ tự giảm dần, điều kiện so sánh trong đoạn code dưới đây cần điền dấu gì vào chỗ trống?

```cpp
for (int i = 0; i < n - 1; i++)
    for (int j = i + 1; j < n; j++)
        if (a[h][i] ___ a[h][j]) {
            int tam = a[h][i];
            a[h][i] = a[h][j];
            a[h][j] = tam;
        }
```

**Đáp án đúng:** `<`

### 3.q19 | medium | code

**Câu hỏi:** Với ma trận vuông `a` cấp `n` được đánh chỉ số hàng `i` và cột `j` từ `1` đến `n`, điều kiện `if (i == 1 || i == n || j == 1 || j == n)` dùng để chọn ra các phần tử nào của ma trận?

```cpp
if (i == 1 || i == n || j == 1 || j == n)
    cout << a[i][j] << " ";
```

- A. Các phần tử nằm trên đường chéo chính
- B. Các phần tử nằm trên đường chéo phụ
- C. Các phần tử nằm trên đường biên của ma trận
- D. Các phần tử nằm ở tâm của ma trận

**Đáp án đúng:** C

### 3.q20 | medium | code

**Câu hỏi:** Đoạn code sau đếm số phần tử có phần nguyên là số chẵn trong mảng `a`. Kết quả in ra là bao nhiêu?

```cpp
float a[4] = {2.7, 3.2, 4.9, 5.1};
int d = 0;
for (int i = 0; i < 4; i++)
    if (int(a[i]) % 2 == 0)
        d++;
cout << d;
```

- A. `1`
- B. `2`
- C. `3`
- D. `4`

**Đáp án đúng:** B

## Nhóm 3: Khó

### 3.q21 | hard | code

**Câu hỏi:** Đoạn code dưới đây tìm vị trí nào của phần tử lớn nhất trong mảng `a`?

```cpp
int a[6] = {4, 9, 2, 9, 5, 9}, n = 6;
int max = a[0];
for (int i = 1; i < n; i++)
    if (max < a[i]) max = a[i];
int i = n - 1;
while (a[i] != max)
    i--;
cout << i;
```

- A. `1` (vị trí xuất hiện đầu tiên của `9`)
- B. `3` (vị trí xuất hiện thứ hai của `9`)
- C. `5` (vị trí xuất hiện sau cùng của `9`)
- D. `9` (giá trị lớn nhất)

**Đáp án đúng:** C

### 3.q22 | hard | code

**Câu hỏi:** Sau khi thực hiện đoạn code chèn phần tử dưới đây, mảng `a` có nội dung là gì?

```cpp
int a[10] = {10, 20, 30, 40}, n = 4;
int x = 99, vt = 1;
for (int i = n - 1; i >= vt; i--)
    a[i + 1] = a[i];
a[vt] = x;
n++;
for (int i = 0; i < n; i++) cout << a[i] << " ";
```

- A. `99 10 20 30 40 `
- B. `10 99 20 30 40 `
- C. `10 99 30 40 40 `
- D. `10 20 99 30 40 `

**Đáp án đúng:** B

### 3.q23 | hard | code

**Câu hỏi:** Trong thuật toán xóa tất cả các phần tử có giá trị bằng `y` khỏi mảng `a` dưới đây, vì sao khi `a[i] == y` và đã dời mảng xong thì KHÔNG tăng `i` (`i++`), mà chỉ tăng `i` ở nhánh `else`?

```cpp
int i = 0;
while (i <= n - 1)
    if (a[i] == y) {
        for (int j = i; j <= n - 2; j++)
            a[j] = a[j + 1];
        n--;
    }
    else i = i + 1;
```

- A. Để tiết kiệm bộ nhớ RAM khi mảng có nhiều phần tử
- B. Để kiểm tra tiếp phần tử mới vừa được dời về vị trí `i` (tránh bỏ sót hai phần tử bằng `y` đứng liền kề nhau)
- C. Vì biến `n` đã tự động tăng lên 1 sau mỗi lần xóa
- D. Vì trong vòng lặp `while` không được phép tăng `i` trong nhánh `if`

**Đáp án đúng:** B

### 3.q24 | hard | code

**Câu hỏi:** Đoạn code sau đếm số phần tử là số chính phương trong ma trận `a`. Kết quả in ra là bao nhiêu?

```cpp
int a[2][3] = {{4, 7, 9}, {12, 16, 15}};
int d = 0;
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        if (sqrt(a[i][j]) == (int)sqrt(a[i][j]))
            d++;
cout << d;
```

- A. `2`
- B. `3`
- C. `4`
- D. `1`

**Đáp án đúng:** B

### 3.q25 | hard | code

**Câu hỏi:** Cho ma trận vuông `a` cấp `n = 3` (đánh chỉ số từ `1` đến `3`). Đoạn code tính tổng các phần tử trên đường chéo phụ dưới đây in ra kết quả bao nhiêu?

```cpp
int a[4][4] = {
    {0, 0, 0, 0},
    {0, 1, 2, 5},
    {0, 4, 6, 8},
    {0, 3, 7, 9}
};
int n = 3, s = 0;
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        if (i + j == n + 1)
            s += a[i][j];
cout << s;
```

- A. `16`
- B. `14`
- C. `15`
- D. `18`

**Đáp án đúng:** B

### 3.q26 | hard | code

**Câu hỏi:** Đoạn code sau kiểm tra tính chất gì của mảng một chiều `a` gồm `n` phần tử?

```cpp
bool kt = true;
for (int i = 0; i < n / 2; i++)
    if (a[i] != a[n - 1 - i]) {
        kt = false;
        break;
    }
```

- A. Kiểm tra mảng `a` có tăng dần hay không
- B. Kiểm tra mảng `a` có đối xứng hay không
- C. Kiểm tra mảng `a` có toàn số dương hay không
- D. Kiểm tra mảng `a` có chứa số nguyên tố hay không

**Đáp án đúng:** B

### 3.q27 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 4; i++)
    a[i + 1] = a[i] + a[i + 1];
cout << a[4];
```

- A. `9`
- B. `15`
- C. `5`
- D. `10`

**Đáp án đúng:** B

### 3.q28 | hard | code

**Câu hỏi:** Cho ma trận `int A[3][4] = {{1, 2, 3, 4}, {3, 2, 1, 4}, {0, 1, 1, 0}};`. Giá trị của biểu thức `A[0][3] + A[1][0] + A[2][2]` bằng bao nhiêu?

```cpp
int A[3][4] = {{1, 2, 3, 4}, {3, 2, 1, 4}, {0, 1, 1, 0}};
cout << A[0][3] + A[1][0] + A[2][2];
```

- A. `6`
- B. `7`
- C. `8`
- D. `9`

**Đáp án đúng:** C

### 3.q29 | hard | code

**Câu hỏi:** Để sao chép `M` phần tử từ mảng `a` bắt đầu từ vị trí `K` sang mảng mới `b` (bắt đầu từ `b[0]`), điền biểu thức chỉ số thích hợp vào chỗ trống:

```cpp
for (int i = 0; i < M; i++)
    b[i] = a[___];
```

**Đáp án đúng:** `K + i`

### 3.q30 | hard | code

**Câu hỏi:** Đoạn code sau in ra màn hình kết quả gì?

```cpp
int a[6] = {2, 5, 2, 8, 2, 9}, n = 6, y = 2;
int i = 0;
while (i <= n - 1)
    if (a[i] == y) {
        for (int j = i; j <= n - 2; j++)
            a[j] = a[j + 1];
        n--;
    } else i++;
cout << n << " " << a[0];
```

- A. `3 5`
- B. `3 2`
- C. `4 5`
- D. `6 5`

**Đáp án đúng:** A
