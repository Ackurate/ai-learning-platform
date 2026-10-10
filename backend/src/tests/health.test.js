import test from 'node:test'
import assert from 'node:assert/strict'
import { app } from '../app.js'

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
