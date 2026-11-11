import fs from 'node:fs/promises'
import path from 'node:path'
import { parseLessonMarkdown } from './seed-content.js'

export async function seedLessons(conn, databaseDir) {
  const [contentColumn] = await conn.execute(
    `SELECT COUNT(*) AS column_count
     FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = 'lessons' AND column_name = 'content'`,
  )
  if (contentColumn[0].column_count === 0) {
    await conn.execute('ALTER TABLE lessons ADD COLUMN content MEDIUMTEXT NULL')
    console.log('Đã cập nhật bảng lessons để lưu nội dung Markdown.')
  }

  const lessonFiles = (await fs.readdir(databaseDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /^\d+\.\d+_.+\.md$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))

  if (lessonFiles.length === 0) {
    throw new Error(`Không tìm thấy file bài học dạng N.N_ten-bai.md trong ${databaseDir}`)
  }

  const lessons = await Promise.all(lessonFiles.map(async (file) => ({
    file,
    lesson: parseLessonMarkdown(await fs.readFile(path.join(databaseDir, file), 'utf8')),
  })))

  await conn.beginTransaction()
  try {
    await conn.execute('DELETE FROM lesson_questions')

    for (const { lesson, file } of lessons) {
      await conn.execute(
        `INSERT INTO lessons (chapter_id, lesson_code, title, description, order_index, content)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE chapter_id = VALUES(chapter_id), title = VALUES(title),
                                 description = VALUES(description), order_index = VALUES(order_index),
                                 content = VALUES(content)`,
        [lesson.chapter_id, lesson.lesson_code, lesson.title, lesson.description, lesson.order_index, lesson.content],
      )

      const [rows] = await conn.execute('SELECT lesson_id FROM lessons WHERE lesson_code = ?', [lesson.lesson_code])
      if (!rows[0]) throw new Error(`Không tìm thấy bài học sau khi nạp: ${file}`)

      for (const question of lesson.questions) {
        await conn.execute(
          `INSERT INTO lesson_questions
             (lesson_id, chapter_id, question_index, content, question_type, options, correct_answer, explanation)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            rows[0].lesson_id,
            question.chapter_id,
            question.question_index,
            question.content,
            question.question_type,
            question.options,
            question.correct_answer,
            question.explanation,
          ],
        )
      }
    }

    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  }

  return {
    lessonCount: lessons.length,
    questionCount: lessons.reduce((count, { lesson }) => count + lesson.questions.length, 0),
  }
}
