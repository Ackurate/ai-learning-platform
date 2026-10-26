import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseLessonMarkdown, parseQuizMarkdown } from '../utils/seed-content.js'

const databaseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../database')

test('lesson parser returns frontmatter and removes the embedded self-check', () => {
  const lesson = parseLessonMarkdown(`---
chapter_id: 2
lesson_code: "2.1"
title: "Cấu trúc rẽ nhánh"
order_index: 1
description: "Điều kiện."
---

## Cấu trúc rẽ nhánh {#if}

Nội dung **bài học**.

\`\`\`cpp
if (n) cout << n;
\`\`\`

### Câu hỏi
**Câu 1:** Chọn đáp án.
- A. Đúng
- B. Sai

**Đáp án đúng:** B`)

  assert.equal(lesson.chapter_id, 2)
  assert.equal(lesson.lesson_code, '2.1')
  assert.match(lesson.content, /Nội dung \*\*bài học\*\*/)
  assert.match(lesson.content, /```cpp/)
  assert.doesNotMatch(lesson.content, /### Câu hỏi/)
  assert.equal(lesson.questions.length, 1)
  assert.equal(lesson.questions[0].content, 'Chọn đáp án.')
  assert.deepEqual(JSON.parse(lesson.questions[0].options), ['A. Đúng', 'B. Sai'])
  assert.equal(lesson.questions[0].correct_answer, 'B. Sai')
  assert.doesNotMatch(lesson.content, /Chọn đáp án|Đáp án đúng/)
})

test('lesson parser extracts inline answers and preserves questions without an answer', () => {
  const lesson = parseLessonMarkdown(`---
chapter_id: 3
lesson_code: "3.1"
title: "Mảng"
order_index: 1
---

## Nội dung

Đoạn nội dung trước câu hỏi.

### Câu hỏi tự kiểm tra
**Câu 1:** Phần tử đầu tiên có chỉ số nào?
A. 0
B. 1

**Đáp án: A.** Chỉ số mảng bắt đầu từ 0.

**Câu 2:** Câu hỏi chưa có đáp án.
- A. Một
- B. Hai

## Phần tiếp theo
Đoạn nội dung sau câu hỏi.`)

  assert.equal(lesson.questions.length, 1)
  assert.equal(lesson.questions[0].correct_answer, 'A. 0')
  assert.equal(lesson.questions[0].explanation, 'Chỉ số mảng bắt đầu từ 0.')
  assert.match(lesson.content, /Câu hỏi chưa có đáp án/)
  assert.match(lesson.content, /Đoạn nội dung sau câu hỏi/)
  assert.doesNotMatch(lesson.content, /Phần tử đầu tiên có chỉ số nào/)
})

test('quiz parser preserves code questions and resolves correct option text', () => {
  const questions = parseQuizMarkdown(`---
chapter_id: 2
---

## Nhóm 1

### 2.q01 | easy | code

**Câu hỏi:** Mã dưới đây cho kết quả gì?

\`\`\`cpp
cout << 2;
\`\`\`

- A. Sai
- B. Đúng

**Đáp án đúng:** B
**Giải thích:** Đây là đáp án đúng.

### 2.q02 | medium | code

**Câu hỏi:** Điền từ khóa.

**Đáp án đúng:** \`while\`
`)

  assert.equal(questions.length, 2)
  assert.equal(questions[0].content, 'Mã dưới đây cho kết quả gì?\n\n```cpp\ncout << 2;\n```')
  assert.deepEqual(JSON.parse(questions[0].options), ['A. Sai', 'B. Đúng'])
  assert.equal(questions[0].correct_answer, 'B. Đúng')
  assert.equal(questions[1].correct_answer, 'while')
  assert.equal(questions[1].options, null)
})

test('all lesson and quiz seed files parse for the seven seeded chapters', async () => {
  const files = await fs.readdir(databaseDir)
  const lessonFiles = files.filter((file) => /^\d+\.\d+_.+\.md$/i.test(file))
  const quizFiles = files.filter((file) => /^quiz_[1-7]\.md$/i.test(file))
  const lessons = await Promise.all(lessonFiles.map(async (file) => (
    parseLessonMarkdown(await fs.readFile(path.join(databaseDir, file), 'utf8'))
  )))
  const quizzes = await Promise.all(quizFiles.map(async (file) => (
    parseQuizMarkdown(await fs.readFile(path.join(databaseDir, file), 'utf8'))
  )))

  assert.ok(lessons.length > 0)
  assert.equal(lessons.length, 52)
  assert.equal(quizFiles.length, 7)
  assert.deepEqual([...new Set(lessons.map((lesson) => lesson.chapter_id))].sort(), [1, 2, 3, 4, 5, 6, 7])
  assert.deepEqual([...new Set(quizzes.flat().map((question) => question.chapter_id))].sort(), [1, 2, 3, 4, 5, 6, 7])
  assert.ok(quizzes.every((questions) => questions.length === 30))
  assert.ok(lessons.every((lesson) => lesson.questions.length >= 2))
  for (const question of lessons.flatMap((lesson) => lesson.questions)) {
    assert.ok(question.content.length > 10, `${question.lesson_code} question text should be retained`)
    if (question.options) {
      assert.ok(JSON.parse(question.options).includes(question.correct_answer), `${question.lesson_code} answer should match an option`)
    }
  }
  for (const question of quizzes.flat()) {
    if (question.options) {
      assert.ok(JSON.parse(question.options).includes(question.correct_answer), `${question.source_code} answer should match an option`)
    }
  }
  assert.ok(lessons.flatMap((lesson) => lesson.questions).every((question) => (
    question.lesson_code && question.options && !Object.hasOwn(question, 'difficulty')
  )))
})
