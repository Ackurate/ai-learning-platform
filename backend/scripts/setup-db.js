// Chạy schema.sql và seed.sql bằng Node.js (không cần lệnh `mysql` trong PATH).
// Dùng thông tin DB_HOST / DB_USER / DB_PASSWORD trong backend/.env
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'
import { seedLessons } from '../src/utils/seed-lessons.js'
import { seedQuizzes } from '../src/utils/seed-quizzes.js'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../database')
const files = ['schema.sql', 'seed.sql']

let conn
try {
  // Chưa chọn database vì schema.sql sẽ tự tạo
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    charset: 'utf8mb4',
    multipleStatements: true,
  })

  for (const file of files) {
    const sql = await fs.readFile(path.join(dir, file), 'utf8')
    await conn.query(sql)
    console.log(`Đã chạy ${file}`)
  }

  const { lessonCount, questionCount } = await seedLessons(conn, dir)
  console.log(`Đã nạp ${lessonCount} bài học và ${questionCount} câu hỏi từ các file bài học.`)
  const { questionCount: quizQuestionCount } = await seedQuizzes(conn, dir)
  console.log(`Đã nạp ${quizQuestionCount} câu hỏi Quiz từ các file quiz_*.md.`)
  console.log('Tạo database xong.')
} catch (err) {
  console.error('Lỗi khi tạo database:', err.message)
  console.error('Kiểm tra lại DB_HOST, DB_USER, DB_PASSWORD trong backend/.env và MySQL đã chạy chưa.')
  process.exitCode = 1
} finally {
  await conn?.end()
}
