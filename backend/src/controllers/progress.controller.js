import { pool } from '../config/db.js'
import { areAllLessonsCompleted, canAccessLesson, findLessonIndex } from '../utils/lesson-sequence.js'
import { loadLessonSequence } from '../services/lesson-sequence.service.js'

const STATUSES = ['not_started', 'in_progress', 'completed']

// Tiến độ của tôi: mọi chương, chương chưa học có status = not_started
export async function getMyProgress(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT c.chapter_id, c.title, c.order_index,
              COALESCE(p.status, 'not_started') AS status, p.last_accessed,
              COALESCE(ls.total_lessons, 0) AS total_lessons,
              COALESCE(ls.completed_lessons, 0) AS completed_lessons
       FROM chapters c
       LEFT JOIN progress p ON p.chapter_id = c.chapter_id AND p.user_id = ?
       LEFT JOIN (
         SELECT l.chapter_id, COUNT(*) AS total_lessons,
                SUM(CASE WHEN lp.status = 'completed' THEN 1 ELSE 0 END) AS completed_lessons
         FROM lessons l
         LEFT JOIN lesson_progress lp ON lp.lesson_id = l.lesson_id AND lp.user_id = ?
         GROUP BY l.chapter_id
       ) ls ON ls.chapter_id = c.chapter_id
       ORDER BY c.order_index`,
      [req.user.id, req.user.id],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

export async function updateProgress(req, res, next) {
  try {
    const { status } = req.body
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' })
    }
    if (status === 'completed') {
      const chapterId = Number(req.params.chapterId)
      if (!Number.isInteger(chapterId) || chapterId < 1) {
        return res.status(400).json({ message: 'Mã chương không hợp lệ' })
      }
      const lessons = await loadLessonSequence(req.user.id, chapterId)
      if (!areAllLessonsCompleted(lessons)) {
        return res.status(409).json({ message: 'Hoàn thành tất cả bài học trong chương trước khi đánh dấu hoàn thành chương' })
      }
    }
    await pool.execute(
      `INSERT INTO progress (user_id, chapter_id, status) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = IF(status = 'completed', 'completed', VALUES(status))`,
      [req.user.id, req.params.chapterId, status],
    )
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

export async function getLessonProgress(req, res, next) {
  try {
    const chapterId = Number(req.params.chapterId)
    if (!Number.isInteger(chapterId) || chapterId < 1) {
      return res.status(400).json({ message: 'Mã chương không hợp lệ' })
    }

    const [rows] = await pool.execute(
      `SELECT l.lesson_id, COALESCE(lp.status, 'not_started') AS status
       FROM lessons l
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.lesson_id AND lp.user_id = ?
       WHERE l.chapter_id = ?
       ORDER BY l.order_index, l.lesson_code`,
      [req.user.id, chapterId],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

export async function updateLessonProgress(req, res, next) {
  try {
    const chapterId = Number(req.params.chapterId)
    const lessonId = Number(req.params.lessonId)
    const { status } = req.body
    if (!Number.isInteger(chapterId) || chapterId < 1 || !Number.isInteger(lessonId) || lessonId < 1) {
      return res.status(400).json({ message: 'Mã bài học không hợp lệ' })
    }
    if (!['in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái bài học không hợp lệ' })
    }

    const lessons = await loadLessonSequence(req.user.id, chapterId)
    const lessonIndex = findLessonIndex(lessons, lessonId)
    if (lessonIndex < 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài học trong chương này' })
    }
    if (!canAccessLesson(lessons, lessonId)) {
      const prerequisite = lessons.slice(0, lessonIndex).find((lesson) => lesson.status !== 'completed')
      return res.status(409).json({
        message: `Hãy hoàn thành bài ${prerequisite.lesson_code} trước khi chuyển tới bài này`,
      })
    }
    if (status === 'completed' && lessons[lessonIndex].status !== 'completed') {
      return res.status(409).json({
        message: 'Bài học chỉ được hoàn thành sau khi trả lời và kiểm tra đủ 2 câu hỏi',
      })
    }
    if (status === 'completed') return res.json({ ok: true })

    await pool.execute(
      `INSERT INTO lesson_progress (user_id, lesson_id, status)
       VALUES (?, ?, 'in_progress')
       ON DUPLICATE KEY UPDATE
         status = IF(status = 'completed', 'completed', 'in_progress')`,
      [req.user.id, lessonId],
    )

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
