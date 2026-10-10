import { pool } from '../config/db.js'

const normalize = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ')

// Chấm bài ở server (client không bao giờ nhận đáp án trước khi nộp)
export async function submitQuiz(req, res, next) {
  try {
    const { chapterId, answers } = req.body
    if (!chapterId || typeof answers !== 'object' || answers === null) {
      return res.status(400).json({ message: 'Dữ liệu nộp bài không hợp lệ' })
    }

    const [questions] = await pool.execute(
      'SELECT question_id, correct_answer, explanation FROM questions WHERE chapter_id = ?',
      [chapterId],
    )
    if (!questions.length) return res.status(404).json({ message: 'Chương chưa có câu hỏi' })

    let totalCorrect = 0
    const details = questions.map((q) => {
      const given = answers[q.question_id] ?? null
      const isCorrect = normalize(given) === normalize(q.correct_answer)
      if (isCorrect) totalCorrect++
      return {
        question_id: q.question_id,
        given,
        correct_answer: q.correct_answer,
        is_correct: isCorrect,
        explanation: q.explanation,
      }
    })

    const totalQuestions = questions.length
    const score = Math.round((totalCorrect / totalQuestions) * 10000) / 100

    await pool.execute(
      `INSERT INTO quiz_results (user_id, chapter_id, score, total_correct, total_questions)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, chapterId, score, totalCorrect, totalQuestions],
    )

    // Đạt từ 70% thì đánh dấu hoàn thành; không bao giờ hạ chương đã hoàn thành
    const status = score >= 70 ? 'completed' : 'in_progress'
    await pool.execute(
      `INSERT INTO progress (user_id, chapter_id, status) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = IF(status = 'completed', 'completed', VALUES(status))`,
      [req.user.id, chapterId, status],
    )

    res.json({ score, total_correct: totalCorrect, total_questions: totalQuestions, details })
  } catch (err) {
    next(err)
  }
}

export async function history(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT r.result_id, r.chapter_id, c.title, r.score, r.total_correct,
              r.total_questions, r.completed_at
       FROM quiz_results r JOIN chapters c ON c.chapter_id = r.chapter_id
       WHERE r.user_id = ? ORDER BY r.completed_at DESC LIMIT 50`,
      [req.user.id],
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
}
