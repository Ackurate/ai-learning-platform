import assert from 'node:assert/strict'
import test from 'node:test'
import { listByChapter } from '../controllers/questions.controller.js'
import { updateLessonProgress, updateProgress } from '../controllers/progress.controller.js'
import { checkLessonQuiz, submitQuiz } from '../controllers/quiz.controller.js'
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

async function invoke(handler, req) {
  const res = createResponse()
  let nextError
  await handler(req, res, (error) => {
    nextError = error
  })
  assert.equal(nextError, undefined)
  return res
}

function withLessonSequence(t, initialLessons) {
  const originalExecute = pool.execute
  const lessons = initialLessons.map((lesson) => ({ ...lesson }))
  const calls = []

  pool.execute = async (query, params) => {
    calls.push({ query, params })
    if (query.includes('FROM lessons l') && query.includes('LEFT JOIN lesson_progress')) {
      return [lessons]
    }
    if (query.includes('FROM lesson_questions')) {
      return [[
        { lesson_question_id: 101, correct_answer: 'A', explanation: '' },
        { lesson_question_id: 102, correct_answer: 'B', explanation: '' },
      ]]
    }
    if (query.includes('INSERT INTO lesson_progress')) {
      const lesson = lessons.find(({ lesson_id }) => Number(lesson_id) === Number(params[1]))
      lesson.status = 'completed'
      return [{ affectedRows: 1 }]
    }
    if (query.includes('INSERT INTO progress')) return [{ affectedRows: 1 }]
    if (query.includes('FROM questions WHERE chapter_id')) return [[{ question_id: 1, correct_answer: 'A' }]]
    throw new Error(`Unexpected database query: ${query}`)
  }

  t.after(() => {
    pool.execute = originalExecute
  })
  return { calls, lessons }
}

test('blocks out-of-order lesson progress and direct lesson completion', async (t) => {
  const { calls } = withLessonSequence(t, [
    { lesson_id: 11, lesson_code: '1.1', status: 'not_started' },
    { lesson_id: 12, lesson_code: '1.2', status: 'completed' },
  ])
  const laterLesson = await invoke(updateLessonProgress, {
    user: { id: 42 },
    params: { chapterId: '1', lessonId: '12' },
    body: { status: 'in_progress' },
  })
  assert.equal(laterLesson.statusCode, 409)

  const directCompletion = await invoke(updateLessonProgress, {
    user: { id: 42 },
    params: { chapterId: '1', lessonId: '11' },
    body: { status: 'completed' },
  })
  assert.equal(directCompletion.statusCode, 409)
  const directChapterCompletion = await invoke(updateProgress, {
    user: { id: 42 },
    params: { chapterId: '1' },
    body: { status: 'completed' },
  })
  assert.equal(directChapterCompletion.statusCode, 409)
  assert.equal(calls.filter(({ query }) => query.includes('INSERT INTO lesson_progress')).length, 0)
  assert.equal(calls.some(({ query }) => query.includes('INSERT INTO progress')), false)
})

test('blocks checking a later lesson and both direct chapter-quiz endpoints', async (t) => {
  const { calls } = withLessonSequence(t, [
    { lesson_id: 11, lesson_code: '1.1', status: 'not_started' },
    { lesson_id: 12, lesson_code: '1.2', status: 'not_started' },
  ])
  const laterLessonCheck = await invoke(checkLessonQuiz, {
    user: { id: 42 },
    body: { chapterId: 1, lessonId: 12, answers: { 101: 'A', 102: 'B' } },
  })
  assert.equal(laterLessonCheck.statusCode, 409)

  const submit = await invoke(submitQuiz, {
    user: { id: 42 },
    body: { chapterId: 1, answers: {} },
  })
  assert.equal(submit.statusCode, 403)

  const questions = await invoke(listByChapter, {
    user: { id: 42 },
    params: { chapterId: '1' },
  })
  assert.equal(questions.statusCode, 403)
  assert.equal(calls.some(({ query }) => query.includes('FROM questions WHERE chapter_id')), false)
})

test('records completion only after the first lesson self-check succeeds', async (t) => {
  const { calls, lessons } = withLessonSequence(t, [
    { lesson_id: 11, lesson_code: '1.1', status: 'not_started' },
    { lesson_id: 12, lesson_code: '1.2', status: 'not_started' },
  ])

  const result = await invoke(checkLessonQuiz, {
    user: { id: 42 },
    body: { chapterId: 1, lessonId: 11, answers: { 101: 'A', 102: 'B' } },
  })

  assert.equal(result.statusCode, 200)
  assert.equal(lessons[0].status, 'completed')
  assert.equal(calls.some(({ query }) => query.includes('INSERT INTO lesson_progress')), true)
})
