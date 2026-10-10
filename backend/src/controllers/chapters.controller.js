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
