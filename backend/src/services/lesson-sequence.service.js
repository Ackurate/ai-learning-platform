import { pool } from '../config/db.js'

export async function loadLessonSequence(userId, chapterId) {
  const [lessons] = await pool.execute(
    `SELECT l.lesson_id, l.lesson_code, l.order_index,
            COALESCE(lp.status, 'not_started') AS status
     FROM lessons l
     LEFT JOIN lesson_progress lp ON lp.lesson_id = l.lesson_id AND lp.user_id = ?
     WHERE l.chapter_id = ?
     ORDER BY l.order_index, l.lesson_code`,
    [userId, chapterId],
  )
  return lessons
}
