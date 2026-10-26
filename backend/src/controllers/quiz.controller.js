import { pool } from '../config/db.js'
import { areAllLessonsCompleted, canAccessLesson, findLessonIndex } from '../utils/lesson-sequence.js'
import { loadLessonSequence } from '../services/lesson-sequence.service.js'

const normalize = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ')

// Chấm bài ở server (client không bao giờ nhận đáp án trước khi nộp)
export async function submitQuiz(req, res, next) {
  try {
    const { chapterId, answers } = req.body
    const normalizedChapterId = Number(chapterId)
    if (!Number.isInteger(normalizedChapterId) || normalizedChapterId < 1 || typeof answers !== 'object' || answers === null || Array.isArray(answers)) {
      return res.status(400).json({ message: 'Dữ liệu nộp bài không hợp lệ' })
    }

    const lessons = await loadLessonSequence(req.user.id, normalizedChapterId)
    if (!areAllLessonsCompleted(lessons)) {
      const firstIncomplete = lessons.find((lesson) => lesson.status !== 'completed')
      return res.status(403).json({
        message: firstIncomplete
          ? `Hoàn thành bài ${firstIncomplete.lesson_code} và các bài còn lại trước khi làm bài trắc nghiệm cuối chương`
          : 'Chương này chưa có bài học để mở bài trắc nghiệm',
      })
    }

    const [questions] = await pool.execute(
      'SELECT question_id, correct_answer FROM questions WHERE chapter_id = ?',
      [normalizedChapterId],
    )
    if (!questions.length) return res.status(404).json({ message: 'Chương chưa có câu hỏi' })

    let totalCorrect = 0
    questions.forEach((q) => {
      const given = answers[q.question_id] ?? null
      const isCorrect = normalize(given) === normalize(q.correct_answer)
      if (isCorrect) totalCorrect++
    })

    const totalQuestions = questions.length
    const score = Math.round((totalCorrect / totalQuestions) * 10000) / 100

    await pool.execute(
      `INSERT INTO quiz_results (user_id, chapter_id, score, total_correct, total_questions)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, normalizedChapterId, score, totalCorrect, totalQuestions],
    )

    // Đạt từ 70% thì đánh dấu hoàn thành; không bao giờ hạ chương đã hoàn thành
    const status = score >= 70 ? 'completed' : 'in_progress'
    await pool.execute(
      `INSERT INTO progress (user_id, chapter_id, status) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = IF(status = 'completed', 'completed', VALUES(status))`,
      [req.user.id, normalizedChapterId, status],
    )

    res.json({ submitted: true })
  } catch (err) {
    next(err)
  }
}

export async function checkLessonQuiz(req, res, next) {
  try {
    const { chapterId, lessonId, answers } = req.body
    const questionIds = Object.keys(answers ?? {}).map(Number)
    const normalizedChapterId = Number(chapterId)
    const normalizedLessonId = Number(lessonId)
    if (
      !Number.isInteger(normalizedChapterId) ||
      normalizedChapterId < 1 ||
      !Number.isInteger(normalizedLessonId) ||
      normalizedLessonId < 1 ||
      !answers ||
      typeof answers !== 'object' ||
      Array.isArray(answers) ||
      questionIds.length !== 2 ||
      questionIds.some((id) => !Number.isInteger(id) || id <= 0) ||
      Object.values(answers).some((answer) => typeof answer !== 'string' || !answer.trim())
    ) {
      return res.status(400).json({ message: 'Hãy chọn đáp án cho đúng 2 câu hỏi' })
    }

    const lessons = await loadLessonSequence(req.user.id, normalizedChapterId)
    const lessonIndex = findLessonIndex(lessons, normalizedLessonId)
    if (lessonIndex < 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài học trong chương này' })
    }
    if (!canAccessLesson(lessons, normalizedLessonId)) {
      const prerequisite = lessons.slice(0, lessonIndex).find((lesson) => lesson.status !== 'completed')
      return res.status(409).json({
        message: `Hãy hoàn thành bài ${prerequisite.lesson_code} trước khi kiểm tra bài này`,
      })
    }

    const [questions] = await pool.execute(
      `SELECT lesson_question_id, correct_answer, explanation
       FROM lesson_questions
       WHERE chapter_id = ? AND lesson_id = ? AND options IS NOT NULL AND lesson_question_id IN (?, ?)`,
      [normalizedChapterId, normalizedLessonId, ...questionIds],
    )
    if (questions.length !== questionIds.length) {
      return res.status(400).json({ message: 'Câu hỏi không thuộc bài học này' })
    }

    const details = questions.map((question) => ({
      question_id: question.lesson_question_id,
      is_correct: normalize(answers[question.lesson_question_id]) === normalize(question.correct_answer),
      correct_answer: question.correct_answer,
      explanation: question.explanation,
    }))
    const totalCorrect = details.filter((detail) => detail.is_correct).length

    await pool.execute(
      `INSERT INTO lesson_progress (user_id, lesson_id, status)
       VALUES (?, ?, 'completed')
       ON DUPLICATE KEY UPDATE status = 'completed'`,
      [req.user.id, normalizedLessonId],
    )

    const [updatedLessons] = await loadLessonSequence(req.user.id, normalizedChapterId)
    if (areAllLessonsCompleted(updatedLessons)) {
      await pool.execute(
        `INSERT INTO progress (user_id, chapter_id, status) VALUES (?, ?, 'completed')
         ON DUPLICATE KEY UPDATE status = 'completed'`,
        [req.user.id, normalizedChapterId],
      )
    }

    res.json({
      total_correct: totalCorrect,
      total_questions: details.length,
      score: Math.round((totalCorrect / details.length) * 100),
      details,
    })
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
