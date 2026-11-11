// Chạy riêng để đồng bộ nội dung bài học mà không nạp các file quiz_*.md.
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'
import { seedLessons } from '../src/utils/seed-lessons.js'

const databaseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../database')
let connection
try {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    charset: 'utf8mb4',
    multipleStatements: true,
  })

  for (const file of ['schema.sql', 'seed.sql']) {
    await connection.query(await fs.readFile(path.join(databaseDir, file), 'utf8'))
  }

  const { lessonCount, questionCount } = await seedLessons(connection, databaseDir)
  console.log(`Đã đồng bộ ${lessonCount} bài học và ${questionCount} câu hỏi từ các file bài học.`)
  console.log('Các file quiz_*.md không được sử dụng bởi lệnh này.')
} catch (err) {
  console.error('Không thể nạp nội dung bài học:', err.message)
  console.error('Kiểm tra MySQL đang chạy và cấu hình DB_HOST, DB_USER, DB_PASSWORD trong backend/.env.')
  process.exitCode = 1
} finally {
  await connection?.end()
}
