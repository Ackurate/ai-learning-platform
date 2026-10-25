import test from 'node:test'
import assert from 'node:assert/strict'
import { app } from '../app.js'
import { buildAiContext } from '../controllers/ai.controller.js'
import { validateEnv } from '../config/env.js'

test('GET /api/health trả về status ok', async () => {
  const server = app.listen(0)
  try {
    const { port } = server.address()
    const res = await fetch(`http://127.0.0.1:${port}/api/health`)
    assert.equal(res.status, 200)
    assert.deepEqual(await res.json(), { status: 'ok' })
  } finally {
    server.close()
  }
})

test('Route cần đăng nhập trả về 401 khi thiếu token', async () => {
  const server = app.listen(0)
  try {
    const { port } = server.address()
    const res = await fetch(`http://127.0.0.1:${port}/api/progress`)
    assert.equal(res.status, 401)
  } finally {
    server.close()
  }
})

test('validateEnv báo lỗi khi thiếu biến môi trường bắt buộc', () => {
  const keys = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET']
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]))

  for (const key of keys) delete process.env[key]

  try {
    assert.throws(
      () => validateEnv(keys),
      /Thiếu biến môi trường bắt buộc: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET/,
    )
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
})

test('validateEnv chấp nhận mật khẩu DB được cấu hình rỗng nhưng vẫn yêu cầu biến này', () => {
  const keys = ['DB_HOST', 'DB_PASSWORD']
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]))

  try {
    process.env.DB_HOST = 'db.example.com'
    process.env.DB_PASSWORD = ''
    assert.equal(validateEnv(keys), true)

    delete process.env.DB_PASSWORD
    assert.throws(() => validateEnv(keys), /Thiếu biến môi trường bắt buộc: DB_PASSWORD/)
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
})

test('buildAiContext không đưa đáp án đúng vào ngữ cảnh AI', () => {
  const context = buildAiContext({
    questionContent: 'Cho biết nguyên nhân của lỗi lặp vô hạn?',
    questionExplanation: 'Bạn cần kiểm tra điều kiện dừng.',
  })

  assert.match(context, /Câu quiz: Cho biết nguyên nhân của lỗi lặp vô hạn\?/)
  assert.match(context, /Giải thích: Bạn cần kiểm tra điều kiện dừng\./)
  assert.doesNotMatch(context, /Đáp án đúng|correct_answer/)
})
