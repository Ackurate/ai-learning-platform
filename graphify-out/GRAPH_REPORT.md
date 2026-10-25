# Graph Report - ai-learning-platform  (2026-10-24)

## Corpus Check
- 116 files · ~50,222 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .css 4, (none) 1, .example 1)

## Summary
- 424 nodes · 641 edges · 50 communities (29 shown, 21 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Backend Services
- Frontend Application
- Backend Dependencies
- Frontend Dependencies
- Application Shell
- Database Setup
- C++ File Streams
- Fraction Structures
- C++ Strings
- Functions and Recursion
- Pointers and Memory
- Project Tooling
- Array Fundamentals
- Home Page
- C++ Structures
- Algorithms and Flowcharts
- Program Lifecycle
- Compilation and Languages
- Learning Platform Architecture
- C++ Program Structure
- Fundamental Data Types
- Variables and Constants
- Array Concepts
- Continuous Integration
- Programming Workflow
- C++ Identifiers
- Switch Selection
- Goto Statements
- For Loops
- While Loops and GCD
- Project Documentation
- C++ Input
- C++ Output
- Conditional Branching
- Loop Control
- Coding Preferences
- Graph Query Guidance

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 15 edges
2. `react` - 14 edges
3. `react-router-dom` - 13 edges
4. `ChapterList()` - 12 edges
5. `App()` - 11 edges
6. `Icon()` - 11 edges
7. `express` - 8 edges
8. `AppShell()` - 8 edges
9. `Home()` - 8 edges
10. `Login()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Project Documentation Inventory` --conceptually_related_to--> `React Frontend Entry Point`  [INFERRED]
  docs/README.md → frontend/index.html
- `Hàm trong C++` --conceptually_related_to--> `Truyền đối số bằng tham chiếu`  [INFERRED]
  database/5.5_Khai_niem_va_cau_truc_ham.md → database/5.7_Cac_cach_truyen_doi_so.md
- `C-String Copy Compare Search and Character Processing` --semantically_similar_to--> `Case-Insensitive Author Search`  [INFERRED] [semantically similar]
  database/quiz_4.md → database/6.5_Ung_dung_quan_ly_sach_thu_vien.md
- `Struct Declaration Initialization and Access` --semantically_similar_to--> `Struct Member Access with Dot and Arrow`  [INFERRED] [semantically similar]
  database/Quiz_6.md → database/6.7_Tong_ket_chuong.md
- `Byte Counting with get` --semantically_similar_to--> `Binary get and put Operations`  [INFERRED] [semantically similar]
  database/7.5_Tinh_do_dai_tap_tin.md → database/7.7_Tap_tin_nhi_phan.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Required Algorithm Properties** — database_1_2_giai_thuat_algorithm_finiteness, database_1_2_giai_thuat_algorithm_executability, database_1_2_giai_thuat_algorithm_completeness, database_1_2_giai_thuat_algorithm_generality [EXTRACTED 1.00]
- **Program Creation and Execution Process** — database_1_6_cac_buoc_tao_va_thuc_thi_chuong_trinh_requirement_analysis, database_1_6_cac_buoc_tao_va_thuc_thi_chuong_trinh_algorithm_design, database_1_6_cac_buoc_tao_va_thuc_thi_chuong_trinh_source_editing, database_1_6_cac_buoc_tao_va_thuc_thi_chuong_trinh_compilation, database_1_6_cac_buoc_tao_va_thuc_thi_chuong_trinh_execution [EXTRACTED 1.00]
- **Các thao tác tìm kiếm và biến đổi mảng một chiều** — database_3_3_cac_chuong_trinh_ung_dung_tren_mang_mot_chieu_tim_kiem_mang, database_3_3_cac_chuong_trinh_ung_dung_tren_mang_mot_chieu_sap_xep_mang, database_3_3_cac_chuong_trinh_ung_dung_tren_mang_mot_chieu_them_xoa_phan_tu [EXTRACTED 1.00]
- **Quy trình cấp phát, xử lý và thu hồi dãy động** — database_5_3_cap_phat_dong_va_thu_hoi_vung_nho_cap_phat_dong, database_5_3_cap_phat_dong_va_thu_hoi_vung_nho_new_delete, database_5_3_cap_phat_dong_va_thu_hoi_vung_nho_sap_xep_day_dong [EXTRACTED 1.00]
- **Các ví dụ đệ quy về tổ hợp và số lẻ** — database_5_10_vi_du_de_quy_to_hop_va_in_so_le_de_quy_tohop, database_5_10_vi_du_de_quy_to_hop_va_in_so_le_de_quy_in_so_le, database_5_8_khai_niem_va_cau_truc_de_quy_de_quy [INFERRED 0.85]
- **Structured Data Management Examples** — database_6_4_ung_dung_cau_truc_phan_so_phanso, database_6_5_ung_dung_quan_ly_sach_thu_vien_sach, database_6_6_ung_dung_quan_ly_sinh_vien_sinhvien [EXTRACTED 1.00]
- **Binary File Length and Copy Operations** — database_7_5_tinh_do_dai_tap_tin_binary_file_length, database_7_6_sao_chep_tap_tin_binary_file_copy, database_7_7_tap_tin_nhi_phan_binary_file_byte_stream [EXTRACTED 1.00]

## Communities (50 total, 21 thin omitted)

### Community 0 - "Backend Services"
Cohesion: 0.10
Nodes (28): pool, login(), me(), publicUser(), register(), sign(), validateRegister(), getChapter() (+20 more)

### Community 1 - "Frontend Application"
Cohesion: 0.15
Nodes (26): api, App(), Protected(), AskAI(), EyeIcon(), PasswordField(), TextField(), AuthLayout() (+18 more)

### Community 2 - "Backend Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, bcryptjs, cors, dotenv, express, express-rate-limit, helmet, jsonwebtoken (+20 more)

### Community 3 - "Frontend Dependencies"
Cohesion: 0.08
Nodes (24): dependencies, axios, d3, react, react-dom, react-router-dom, recharts, devDependencies (+16 more)

### Community 4 - "Application Shell"
Cohesion: 0.19
Nodes (18): AppShell(), Brand(), LEARN_ITEMS, NavItem(), Action(), BADGES, ChapterCard(), ChapterCardSkeleton() (+10 more)

### Community 5 - "Database Setup"
Cohesion: 0.13
Nodes (11): dir, files, app, ensureRequiredEnv(), required, validateEnv(), ask(), buildAiContext() (+3 more)

### Community 6 - "C++ File Streams"
Cohesion: 0.11
Nodes (11): fstream File Reader and Writer, ifstream File Reader, ofstream File Writer, Employee Text-File Save and Display Workflow, Rewind File Read Position with seekg, Byte Counting with get, File Length with seekg and tellg, Buffered Copy with read write and gcount (+3 more)

### Community 8 - "C++ Strings"
Cohesion: 0.17
Nodes (17): Chuỗi ký tự kiểu char, Ký tự kết thúc chuỗi \0, Định nghĩa và khai báo chuỗi ký tự, Nhập chuỗi bằng cin.getline, Cách sử dụng và phương thức nhập chuỗi, Truy cập ký tự trong chuỗi, Nhóm hàm sao chép và ghép nối chuỗi, Ghép nối chuỗi với strcat và strncat (+9 more)

### Community 9 - "Functions and Recursion"
Cohesion: 0.17
Nodes (17): Đệ quy in số lẻ, Đệ quy tính tổ hợp, Ví dụ đệ quy: tổ hợp và in số lẻ, Hàm trong C++, Khai báo và định nghĩa hàm, Khái niệm và cấu trúc hàm, Đối số mặc định, Lời gọi hàm, đối số mặc định và quá tải hàm (+9 more)

### Community 10 - "Pointers and Memory"
Cohesion: 0.18
Nodes (17): Con trỏ, Tổng quan về con trỏ, Toán tử lấy địa chỉ và giải tham chiếu, Duyệt mảng bằng con trỏ, Các phép toán trên con trỏ, Phép toán con trỏ, Cấp phát bộ nhớ động, Cấp phát động và thu hồi vùng nhớ (+9 more)

### Community 11 - "Project Tooling"
Cohesion: 0.14
Nodes (13): description, devDependencies, concurrently, name, private, scripts, build, db:setup (+5 more)

### Community 12 - "Array Fundamentals"
Cohesion: 0.23
Nodes (13): Chỉ số mảng và truy cập phần tử, Mảng một chiều: định nghĩa, khai báo và cách sử dụng, Mảng một chiều, Các chương trình ứng dụng trên mảng một chiều, Sắp xếp mảng tăng dần, Thêm và xóa phần tử mảng, Tìm kiếm trong mảng, Khai báo và khởi tạo ma trận (+5 more)

### Community 13 - "Home Page"
Cohesion: 0.21
Nodes (10): Brand(), CODE_LINES, Home(), LESSONS, METHOD, NAV_LINKS, NavItem(), SectionIntro() (+2 more)

### Community 14 - "C++ Structures"
Cohesion: 0.27
Nodes (11): Bản ghi sinh viên, Cấu trúc lồng nhau, Kiểu cấu trúc, Khái niệm và khai báo kiểu cấu trúc, Con trỏ cấu trúc và toán tử mũi tên, Khởi tạo biến cấu trúc, Khởi tạo và truy xuất thành phần cấu trúc, Truy xuất thành phần cấu trúc (+3 more)

### Community 15 - "Algorithms and Flowcharts"
Cohesion: 0.25
Nodes (7): Algorithm, Quadratic Equation Algorithm, Flowchart, Flowchart Decision Symbol, Flowchart Input/Output Symbol, Flowchart Process Symbol, Pseudocode

### Community 16 - "Program Lifecycle"
Cohesion: 0.33
Nodes (6): Algorithm Design, Program Compilation, Program Execution, Program Development Process, Program Requirement Analysis, Source Code Editing

### Community 17 - "Compilation and Languages"
Cohesion: 0.40
Nodes (5): Assembler, Assembly Language, Compiler, High-Level Programming Language, Machine Language

### Community 18 - "Learning Platform Architecture"
Cohesion: 0.40
Nodes (5): AI-Assisted Programming Learning Platform, LLM API, MySQL Database, Node.js and Express Backend, React and Vite Frontend

### Community 19 - "C++ Program Structure"
Cohesion: 0.50
Nodes (4): Program Comments, C++ Program Structure, Library Declarations, main Function

### Community 20 - "Fundamental Data Types"
Cohesion: 0.50
Nodes (4): ASCII Character Encoding, Boolean Type, Character Type, C++ Fundamental Data Types

### Community 21 - "Variables and Constants"
Cohesion: 0.50
Nodes (4): Assignment, Constant, Variable, Variable Scope

### Community 22 - "Array Concepts"
Cohesion: 0.50
Nodes (4): Array, Contiguous Memory Layout, Dense List, Array Element Type

### Community 23 - "Continuous Integration"
Cohesion: 0.67
Nodes (3): Backend Test Job, Continuous Integration Workflow, Frontend Build Job

### Community 24 - "Programming Workflow"
Cohesion: 0.67
Nodes (3): Data Organization, Processing Procedure, Programming

### Community 25 - "C++ Identifiers"
Cohesion: 0.67
Nodes (3): Case Sensitivity, C++ Keyword, Identifier

### Community 26 - "Switch Selection"
Cohesion: 0.67
Nodes (3): case Fallthrough, default Case, switch Selection

### Community 28 - "For Loops"
Cohesion: 0.67
Nodes (3): for Loop, Loop Initialization, Condition, and Update, Nested for Loops

### Community 29 - "While Loops and GCD"
Cohesion: 0.67
Nodes (3): Euclidean GCD Algorithm, while Loop, do...while Loop

### Community 30 - "Project Documentation"
Cohesion: 0.67
Nodes (3): Project Documentation Inventory, React Frontend Entry Point, Frontend Root Mount Element

## Knowledge Gaps
- **118 isolated node(s):** `name`, `version`, `private`, `type`, `main` (+113 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 160 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-router-dom` connect `Frontend Application` to `Frontend Dependencies`, `Application Shell`, `Home Page`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `react` connect `Frontend Application` to `Frontend Dependencies`, `Application Shell`, `Home Page`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `express` connect `Backend Services` to `Backend Dependencies`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _118 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Backend Services` be split into smaller, more focused modules?**
  _Cohesion score 0.09830866807610994 - nodes in this community are weakly interconnected._
- **Should `Frontend Application` be split into smaller, more focused modules?**
  _Cohesion score 0.14512195121951219 - nodes in this community are weakly interconnected._
- **Should `Backend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._