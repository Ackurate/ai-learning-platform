import 'dotenv/config'
import mysql from 'mysql2/promise'

const [, , username, role = 'student'] = process.argv

const conn = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'AI_Learning_Platform',
})

try {
  if (!username) {
    // Nếu không truyền username, hiển thị danh sách quyền tất cả user hiện tại
    const [users] = await conn.query('SELECT user_id, username, email, role, created_at FROM users')
    console.log('\n--- DANH SÁCH TÀI KHOẢN VÀ QUYỀN HIỆN TẠI ---')
    console.table(users)
    console.log('Cách đổi quyền: node scripts/set-role.js <username> <student|admin>\n')
    process.exit(0)
  }

  if (!['student', 'admin'].includes(role)) {
    console.error("Lỗi: Quyền (role) chỉ có thể là 'student' hoặc 'admin'")
    process.exit(1)
  }

  const [result] = await conn.execute(
    'UPDATE users SET role = ? WHERE username = ?',
    [role, username],
  )

  if (result.affectedRows === 0) {
    console.log(`Không tìm thấy tài khoản có username: "${username}"`)
  } else {
    console.log(`Thành công: Đã chuyển tài khoản "${username}" về quyền "${role}".`)
  }
} catch (err) {
  console.error('Lỗi khi cập nhật quyền:', err.message)
} finally {
  await conn.end()
}

