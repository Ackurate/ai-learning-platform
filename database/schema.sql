-- Tạo Database cho dự án (utf8mb4 để lưu tiếng Việt đầy đủ)
CREATE DATABASE IF NOT EXISTS AI_Learning_Platform
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE AI_Learning_Platform;

-- 1. Bảng users (Tài khoản người dùng)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng chapters (Nội dung các chương học)
CREATE TABLE IF NOT EXISTS chapters (
    chapter_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bài học chi tiết, được nạp từ các file Markdown trong database/
CREATE TABLE IF NOT EXISTS lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    lesson_code VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL,
    content MEDIUMTEXT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    lesson_progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    status ENUM('in_progress', 'completed') NOT NULL DEFAULT 'in_progress',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lesson_questions (
    lesson_question_id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    chapter_id INT NOT NULL,
    question_index INT NOT NULL,
    content TEXT NOT NULL,
    question_type VARCHAR(30) NOT NULL,
    options JSON,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    UNIQUE (lesson_id, question_index),
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

-- 3. Bảng questions (Ngân hàng câu hỏi trắc nghiệm & code)
CREATE TABLE IF NOT EXISTS questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    content TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'code') NOT NULL,
    options JSON, -- Lưu trữ các đáp án dưới dạng chuỗi JSON
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

-- 4. Bảng quiz_results (Lưu kết quả làm bài của học viên)
CREATE TABLE IF NOT EXISTS quiz_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    chapter_id INT NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    total_correct INT NOT NULL,
    total_questions INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE
);

-- 5. Bảng progress (Theo dõi tiến độ học tập từng chương)
CREATE TABLE IF NOT EXISTS progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    chapter_id INT NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    UNIQUE (user_id, chapter_id) -- Đảm bảo mỗi user chỉ có 1 bản ghi tiến độ cho mỗi chương
);
USE AI_Learning_Platform;
SHOW TABLES;