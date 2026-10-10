import { pool } from '../config/db.js'

// MariaDB (XAMPP) trả cột JSON dưới dạng chuỗi, MySQL trả sẵn object
const parseOptions = (value) => {
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

// Trả câu hỏi của một chương, KHÔNG gửi đáp án đúng và giải thích về client
export async function listByChapter(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT question_id, chapter_id, content, question_type, options, difficulty
       FROM questions WHERE chapter_id = ? ORDER BY question_id`,
      [req.params.chapterId],
    )
    res.json(rows.map((q) => ({ ...q, options: parseOptions(q.options) })))
  } catch (err) {
    next(err)
  }
}
