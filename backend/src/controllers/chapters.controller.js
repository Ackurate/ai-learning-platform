import { pool } from '../config/db.js'

export async function listChapters(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT chapter_id, title, description, order_index FROM chapters ORDER BY order_index',
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

export async function getChapter(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT chapter_id, title, description, order_index FROM chapters WHERE chapter_id = ?',
      [req.params.chapterId],
    )
    if (!rows[0]) return res.status(404).json({ message: 'Không tìm thấy chương' })
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
}

export async function listLessons(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT lesson_id, chapter_id, lesson_code, title, description, order_index, content
       FROM lessons WHERE chapter_id = ? ORDER BY order_index, lesson_code`,
      [req.params.chapterId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

export async function listLessonQuestions(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT lesson_question_id, lesson_id, chapter_id, question_index, content, question_type, options
       FROM lesson_questions WHERE chapter_id = ? AND lesson_id = ? ORDER BY question_index`,
      [req.params.chapterId, req.params.lessonId],
    )
    res.json(rows.map((question) => ({
      ...question,
      question_id: question.lesson_question_id,
      options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options,
    })))
  } catch (err) {
    next(err)
  }
}
