import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

const sign = (user) =>
  jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })

const publicUser = (u) => ({ user_id: u.user_id, username: u.username, email: u.email, role: u.role })

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ username, email và mật khẩu' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' })
    }

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
