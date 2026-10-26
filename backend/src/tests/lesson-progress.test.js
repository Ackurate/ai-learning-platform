import 'dotenv/config'
import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { app } from '../app.js'
import { pool } from '../config/db.js'

test('lessons unlock in order and chapter quizzes stay locked until all lessons are checked', {
  skip: process.env.RUN_DB_TESTS !== '1',
}, async () => {
  const nonce = crypto.randomUUID()
  const [userResult] = await pool.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [`lesson-progress-${nonce}`, `${nonce}@example.test`, 'test-only'],
  )
  const userId = userResult.insertId
  const [lessons] = await pool.execute(
    'SELECT lesson_id, lesson_code FROM lessons WHERE chapter_id = 1 ORDER BY order_index, lesson_code',
  )
  assert.ok(lessons.length > 1, 'chapter should have multiple seeded lessons')

  const token = jwt.sign({ id: userId, role: 'student' }, process.env.JWT_SECRET)
  const server = app.listen(0)

  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}/api`
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    const getLessonQuestions = async (lessonId) => {
      const [questions] = await pool.execute(
        `SELECT lesson_question_id, options FROM lesson_questions
         WHERE chapter_id = 1 AND lesson_id = ? AND options IS NOT NULL
         ORDER BY question_index LIMIT 2`,
        [lessonId],
      )
      assert.equal(questions.length, 2, `lesson ${lessonId} should have two self-check questions`)
      return Object.fromEntries(questions.map((question) => {
        const options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options
        return [question.lesson_question_id, options[0]]
      }))
    }
    const checkLesson = async (lessonId) => fetch(`${baseUrl}/quiz/check-lesson`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        chapterId: 1,
        lessonId,
        answers: await getLessonQuestions(lessonId),
      }),
    })

    const earlyQuizQuestions = await fetch(`${baseUrl}/questions/chapter/1`, { headers })
    assert.equal(earlyQuizQuestions.status, 403)

    const earlyQuizSubmit = await fetch(`${baseUrl}/quiz/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ chapterId: 1, answers: {} }),
    })
    assert.equal(earlyQuizSubmit.status, 403)

    const laterLessonProgress = await fetch(`${baseUrl}/progress/lessons/1/${lessons.at(-1).lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'in_progress' }),
    })
    assert.equal(laterLessonProgress.status, 409)

    const directCompletion = await fetch(`${baseUrl}/progress/lessons/1/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'completed' }),
    })
    assert.equal(directCompletion.status, 409)

    const laterLessonCheck = await checkLesson(lessons[1].lesson_id)
    assert.equal(laterLessonCheck.status, 409)

    const firstLessonCheck = await checkLesson(lessons[0].lesson_id)
    assert.equal(firstLessonCheck.status, 200)

    const firstLessonProgress = await fetch(`${baseUrl}/progress/lessons/1/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'in_progress' }),
    })
    assert.equal(firstLessonProgress.status, 200)

    for (const lesson of lessons.slice(1)) {
      const checkResponse = await checkLesson(lesson.lesson_id)
      assert.equal(checkResponse.status, 200, `lesson ${lesson.lesson_code} should unlock after earlier lessons are checked`)
    }

    const unlockedQuizQuestions = await fetch(`${baseUrl}/questions/chapter/1`, { headers })
    assert.equal(unlockedQuizQuestions.status, 200)

    const unlockedQuizSubmit = await fetch(`${baseUrl}/quiz/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ chapterId: 1, answers: {} }),
    })
    assert.equal(unlockedQuizSubmit.status, 200)

    const chapterProgressResponse = await fetch(`${baseUrl}/progress`, { headers })
    assert.equal(chapterProgressResponse.status, 200)
    const chapterProgress = await chapterProgressResponse.json()
    const completedChapter = chapterProgress.find((item) => Number(item.chapter_id) === 1)
    assert.equal(Number(completedChapter.total_lessons), lessons.length)
    assert.equal(Number(completedChapter.completed_lessons), lessons.length)

    const reopenedResponse = await fetch(`${baseUrl}/progress/lessons/1`, { headers })
    assert.equal(reopenedResponse.status, 200)
    const progress = await reopenedResponse.json()
    assert.ok(progress.some((item) => (
      item.lesson_id === lessons[0].lesson_id && item.status === 'completed'
    )), `completed lesson should be restored after reopening the chapter: ${JSON.stringify(progress.slice(0, 2))}`)

    const invalidLessonResponse = await fetch(`${baseUrl}/progress/lessons/2/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'in_progress' }),
    })
    assert.equal(invalidLessonResponse.status, 404)
  } finally {
    server.closeAllConnections()
    await new Promise((resolve) => server.close(resolve))
    await pool.execute('DELETE FROM users WHERE user_id = ?', [userId])
    await pool.end()
  }
})
