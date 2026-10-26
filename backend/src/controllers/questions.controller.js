import { pool } from '../config/db.js'
import { areAllLessonsCompleted } from '../utils/lesson-sequence.js'
import { loadLessonSequence } from '../services/lesson-sequence.service.js'

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
    const chapterId = Number(req.params.chapterId)
    if (!Number.isInteger(chapterId) || chapterId < 1) {
      return res.status(400).json({ message: 'Mã chương không hợp lệ' })
    }

    const lessons = await loadLessonSequence(req.user.id, chapterId)
    if (!areAllLessonsCompleted(lessons)) {
      const firstIncomplete = lessons.find((lesson) => lesson.status !== 'completed')
      return res.status(403).json({
        message: firstIncomplete
          ? `Hoàn thành bài ${firstIncomplete.lesson_code} và các bài còn lại trước khi làm bài trắc nghiệm cuối chương`
          : 'Chương này chưa có bài học để mở bài trắc nghiệm',
      })
    }

    const [rows] = await pool.execute(
      `SELECT question_id, chapter_id, content, question_type, options, difficulty
       FROM questions WHERE chapter_id = ? ORDER BY question_id`,
      [chapterId],
    )
    res.json(rows.map((q) => ({ ...q, options: parseOptions(q.options) })))
  } catch (err) {
    next(err)
  }
}
