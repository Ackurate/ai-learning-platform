import { pool } from '../config/db.js'

const STATUSES = ['not_started', 'in_progress', 'completed']

// Tiến độ của tôi: mọi chương, chương chưa học có status = not_started
export async function getMyProgress(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT c.chapter_id, c.title, c.order_index,
              COALESCE(p.status, 'not_started') AS status, p.last_accessed
       FROM chapters c
       LEFT JOIN progress p ON p.chapter_id = c.chapter_id AND p.user_id = ?
       ORDER BY c.order_index`,
      [req.user.id],
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

    const [result] = await pool.execute(
      `INSERT INTO lesson_progress (user_id, lesson_id, status)
       SELECT ?, lesson_id, ?
       FROM lessons
       WHERE lesson_id = ? AND chapter_id = ?
       ON DUPLICATE KEY UPDATE
         status = IF(status = 'completed', 'completed', VALUES(status))`,
      [req.user.id, status, lessonId, chapterId],
    )
    if (result.affectedRows === 0) {
      const [rows] = await pool.execute(
        'SELECT lesson_id FROM lessons WHERE lesson_id = ? AND chapter_id = ?',
        [lessonId, chapterId],
      )
      if (!rows.length) return res.status(404).json({ message: 'Không tìm thấy bài học trong chương này' })
    }

    if (status === 'completed') {
      const [[chapterCompletion]] = await pool.execute(
        `SELECT COUNT(*) AS total,
                SUM(CASE WHEN lp.status = 'completed' THEN 1 ELSE 0 END) AS completed
         FROM lessons l
         LEFT JOIN lesson_progress lp ON lp.lesson_id = l.lesson_id AND lp.user_id = ?
         WHERE l.chapter_id = ?`,
        [req.user.id, chapterId],
      )
      if (chapterCompletion.total > 0 && chapterCompletion.total === Number(chapterCompletion.completed)) {
        await pool.execute(
          `INSERT INTO progress (user_id, chapter_id, status) VALUES (?, ?, 'completed')
           ON DUPLICATE KEY UPDATE status = 'completed'`,
          [req.user.id, chapterId],
        )
      }
    }

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
