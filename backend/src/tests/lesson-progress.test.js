import 'dotenv/config'
import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { app } from '../app.js'
import { pool } from '../config/db.js'

test('lesson completion remains available after leaving and reopening the chapter', {
  skip: process.env.RUN_DB_TESTS !== '1',
}, async () => {
  const nonce = crypto.randomUUID()
  const [userResult] = await pool.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [`lesson-progress-${nonce}`, `${nonce}@example.test`, 'test-only'],
  )
  const userId = userResult.insertId
  const [lessons] = await pool.execute(
    'SELECT lesson_id FROM lessons WHERE chapter_id = 1 ORDER BY order_index LIMIT 1',
  )
  assert.ok(lessons[0], 'seeded lesson should be available')

  const token = jwt.sign({ id: userId, role: 'student' }, process.env.JWT_SECRET)
  const server = app.listen(0)

  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}/api/progress/lessons/1`
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    const completeResponse = await fetch(`${baseUrl}/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'completed' }),
    })
    assert.equal(completeResponse.status, 200)

    const revisitResponse = await fetch(`${baseUrl}/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'in_progress' }),
    })
    assert.equal(revisitResponse.status, 200)

    const reopenedResponse = await fetch(baseUrl, { headers })
    assert.equal(reopenedResponse.status, 200)
    const progress = await reopenedResponse.json()
    assert.ok(progress.some((item) => (
      item.lesson_id === lessons[0].lesson_id && item.status === 'completed'
    )), `completed lesson should be restored after reopening the chapter: ${JSON.stringify(progress.slice(0, 2))}`)

    const invalidLessonResponse = await fetch(`${baseUrl.replace('/lessons/1', '/lessons/2')}/${lessons[0].lesson_id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: 'completed' }),
    })
    assert.equal(invalidLessonResponse.status, 404)
  } finally {
    server.closeAllConnections()
    await new Promise((resolve) => server.close(resolve))
    await pool.execute('DELETE FROM users WHERE user_id = ?', [userId])
    await pool.end()
  }
})
