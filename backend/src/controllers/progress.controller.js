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
