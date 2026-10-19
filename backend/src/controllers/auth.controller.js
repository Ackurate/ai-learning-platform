import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

const sign = (user) =>
  jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

const publicUser = (u) => ({ user_id: u.user_id, username: u.username, email: u.email, role: u.role })

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Kiểm tra dữ liệu đăng ký. Trả về thông báo lỗi (string) hoặc null nếu hợp lệ.
// Giữ đồng bộ với validate() trong frontend/src/pages/Register.jsx.
// Độ dài username (50) và email (100) khớp với bảng users trong schema.sql.
export function validateRegister({ username, email, password } = {}) {
  if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return 'Vui lòng nhập đủ username, email và mật khẩu'
  }

  const name = username.trim()
  const mail = email.trim()
  if (!name || !mail || !password) {
    return 'Vui lòng nhập đủ username, email và mật khẩu'
  }
  if (name.length > 50) return 'Tên đăng nhập tối đa 50 ký tự'
  if (mail.length > 100) return 'Email tối đa 100 ký tự'
  if (!EMAIL_RE.test(mail)) return 'Email không hợp lệ'

  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Mật khẩu cần ít nhất 8 ký tự, gồm chữ và số'
  }
  // bcrypt chỉ dùng 72 byte đầu của mật khẩu
  if (password.length > 72) return 'Mật khẩu tối đa 72 ký tự'

  return null
}

export async function register(req, res, next) {
  try {
    const invalid = validateRegister(req.body)
    if (invalid) return res.status(400).json({ message: invalid })

    const username = req.body.username.trim()
    const email = req.body.email.trim()
    const { password } = req.body

    const hash = await bcrypt.hash(password, 10)
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash],
    )
    const user = { user_id: result.insertId, username, email, role: 'student' }
    res.status(201).json({ token: sign(user), user: publicUser(user) })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Username hoặc email đã tồn tại' })
    }
    next(err)
  }
}

// Đăng nhập không kiểm tra độ mạnh mật khẩu, để tài khoản cũ (mật khẩu 6 ký tự) vẫn vào được.
export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' })
    }

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]
    const ok = user && (await bcrypt.compare(password, user.password_hash))
    if (!ok) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })

    res.json({ token: sign(user), user: publicUser(user) })
  } catch (err) {
    next(err)
  }
}

export async function me(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, username, email, role FROM users WHERE user_id = ?',
      [req.user.id],
    )
    if (!rows[0]) return res.status(404).json({ message: 'Không tìm thấy người dùng' })
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
}
