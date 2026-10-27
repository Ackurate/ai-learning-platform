import assert from 'node:assert/strict'
import test from 'node:test'
import { submitQuiz } from '../controllers/quiz.controller.js'
import { getMyProgress } from '../controllers/progress.controller.js'
import { pool } from '../config/db.js'

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
  }
}

function withQuizData(t) {
  const originalExecute = pool.execute
  const questions = Array.from({ length: 100 }, (_, index) => ({
    question_id: index + 1,
    correct_answer: 'A',
  }))
  const calls = []

  pool.execute = async (query, params) => {
    if (query.includes('FROM lessons l') && query.includes('LEFT JOIN lesson_progress')) {
      return [[{ lesson_id: 1, lesson_code: '1.1', status: 'completed' }]]
    }
    if (query.includes('FROM questions WHERE chapter_id')) return [questions]
    if (query.includes('INSERT INTO quiz_results') || query.includes('INSERT INTO progress')) {
      calls.push({ query, params })
      return [{ affectedRows: 1 }]
    }
    throw new Error(`Unexpected database query: ${query}`)
  }

  t.after(() => {
    pool.execute = originalExecute
  })
  return calls
}

async function submitWithCorrectAnswers(correctCount, wrongCount = 0) {
  const answers = Object.fromEntries(
    Array.from({ length: correctCount }, (_, index) => [index + 1, 'A']),
  )
  for (let index = 0; index < wrongCount; index++) {
    answers[correctCount + index + 1] = 'B'
  }
  const res = createResponse()
  await submitQuiz(
    { user: { id: 42, role: 'student' }, body: { chapterId: 1, answers } },
    res,
    (error) => {
      throw error
    },
  )
  return res
}

test('chapter progress only reports completion after a passing final quiz', async (t) => {
  const originalExecute = pool.execute
  pool.execute = async () => [[
    {
      chapter_id: 1,
      stored_status: 'completed',
      quiz_passed: 0,
      total_lessons: 2,
      completed_lessons: 2,
    },
    {
      chapter_id: 2,
      stored_status: 'completed',
      quiz_passed: 1,
      total_lessons: 2,
      completed_lessons: 2,
    },
    {
      chapter_id: 3,
      stored_status: 'not_started',
      quiz_passed: 0,
      total_lessons: 2,
      completed_lessons: 0,
    },
  ]]
  t.after(() => {
    pool.execute = originalExecute
  })

  const res = createResponse()
  await getMyProgress({ user: { id: 42, role: 'student' } }, res, (error) => {
    throw error
  })

  assert.deepEqual(res.body.map(({ chapter_id, status }) => ({ chapter_id, status })), [
    { chapter_id: 1, status: 'in_progress' },
    { chapter_id: 2, status: 'completed' },
    { chapter_id: 3, status: 'not_started' },
  ])
})

test('admin chapter progress keeps its existing completion status', async (t) => {
  const originalExecute = pool.execute
  pool.execute = async () => [[{
    chapter_id: 1,
    stored_status: 'completed',
    quiz_passed: 0,
    total_lessons: 2,
    completed_lessons: 2,
  }]]
  t.after(() => {
    pool.execute = originalExecute
  })

  const res = createResponse()
  await getMyProgress({ user: { id: 42, role: 'admin' } }, res, (error) => {
    throw error
  })
  assert.equal(res.body[0].status, 'completed')
})

test('a score of exactly 70 percent is not passing and reports answer counts', async (t) => {
  const calls = withQuizData(t)
  const res = await submitWithCorrectAnswers(70, 1)

  assert.equal(res.statusCode, 200)
  assert.deepEqual(res.body, {
    submitted: true,
    score: 70,
    total_correct: 70,
    total_incorrect: 1,
    total_unanswered: 29,
    total_questions: 100,
    passed: false,
  })
  assert.equal(calls.find(({ query }) => query.includes('INSERT INTO progress')).params[2], 'in_progress')
})

test('a score above 70 percent passes and completes the chapter', async (t) => {
  const calls = withQuizData(t)
  const res = await submitWithCorrectAnswers(71)

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.score, 71)
  assert.equal(res.body.passed, true)
  assert.equal(calls.find(({ query }) => query.includes('INSERT INTO progress')).params[2], 'completed')
})
