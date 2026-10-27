import fs from 'node:fs/promises'
import path from 'node:path'
import { parseQuizMarkdown } from './seed-content.js'

export async function seedQuizzes(conn, databaseDir) {
  const quizFiles = (await fs.readdir(databaseDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /^quiz_[1-7]\.md$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))

  if (quizFiles.length === 0) {
    throw new Error(`Không tìm thấy file quiz_1.md đến quiz_7.md trong ${databaseDir}`)
  }

  const questions = (await Promise.all(quizFiles.map(async (file) => (
    parseQuizMarkdown(await fs.readFile(path.join(databaseDir, file), 'utf8'))
  )))).flat()

  await conn.beginTransaction()
  try {
    await conn.execute('DELETE FROM questions')
    for (const question of questions) {
      const [existing] = await conn.execute(
        'SELECT question_id FROM questions WHERE chapter_id = ? AND content = ? LIMIT 1',
        [question.chapter_id, question.content],
      )
      if (existing[0]) {
        await conn.execute(
          `UPDATE questions
           SET question_type = ?, options = ?, correct_answer = ?, explanation = ?, difficulty = ?
           WHERE question_id = ?`,
          [
            question.question_type,
            question.options,
            question.correct_answer,
            question.explanation,
            question.difficulty,
            existing[0].question_id,
          ],
        )
      } else {
        await conn.execute(
          `INSERT INTO questions (chapter_id, content, question_type, options, correct_answer, explanation, difficulty)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            question.chapter_id,
            question.content,
            question.question_type,
            question.options,
            question.correct_answer,
            question.explanation,
            question.difficulty,
          ],
        )
      }
    }
    await conn.commit()
  } catch (err) {
    await conn.rollback()
    throw err
  }

  return { questionCount: questions.length }
}
