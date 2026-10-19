import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import { TextField, PasswordField } from '../components/AuthFields.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Quy tắc theo thiết kế: tối thiểu 8 ký tự, gồm chữ và số (tối đa 72 vì bcrypt).
// Độ dài username (50) và email (100) khớp với bảng users trong schema.sql.
// Giữ đồng bộ với validateRegister() trong backend/src/controllers/auth.controller.js.
function validate({ username, email, password, confirm, agree }) {
  const errors = {}

  const name = username.trim()
  if (!name) errors.username = 'Vui lòng nhập tên đăng nhập.'
  else if (name.length > 50) errors.username = 'Tên đăng nhập tối đa 50 ký tự.'

  const mail = email.trim()
  if (!mail) errors.email = 'Vui lòng nhập email.'
  else if (mail.length > 100) errors.email = 'Email tối đa 100 ký tự.'
  else if (!EMAIL_RE.test(mail)) errors.email = 'Email không hợp lệ.'

  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Mật khẩu cần ít nhất 8 ký tự, gồm chữ và số.'
  } else if (password.length > 72) {
    errors.password = 'Mật khẩu tối đa 72 ký tự.'
  }

  if (!confirm) errors.confirm = 'Vui lòng nhập lại mật khẩu.'
  else if (confirm !== password) errors.confirm = 'Mật khẩu xác nhận không khớp.'

  if (!agree) errors.agree = 'Bạn cần đồng ý với điều khoản để tiếp tục.'

  return errors
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const found = validate({ username, email, password, confirm, agree })
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      await register(username.trim(), email.trim(), password)
      navigate('/chapters')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Đăng ký thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  // Link Điều khoản / Chính sách: tạm để trống, sẽ gắn trang thật sau
  const stopLink = (e) => e.preventDefault()

  return (
    <AuthLayout
      asideTitle={['Dòng code đầu tiên.', 'Một khởi đầu mới.']}
      asideText="Không cần kiến thức lập trình trước đó. Bắt đầu với ví dụ đơn giản và học theo nhịp của bạn."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-intro">
          <p className="auth-eyebrow">TẠO TÀI KHOẢN</p>
          <h1 className="auth-title">Bắt đầu hành trình học C++</h1>
          <p className="auth-lead">
            Tạo tài khoản để học từng bước, lưu tiến độ và thực hành từ những dòng code đầu tiên.
          </p>
        </div>

        <div className="auth-fields">
          <TextField
            id="username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập của bạn"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="ban@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <PasswordField
            id="password"
            label="Mật khẩu"
            placeholder="Tạo mật khẩu của bạn"
            hint="Ít nhất 8 ký tự, gồm chữ và số."
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <PasswordField
            id="confirm"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
          />
        </div>

        <div className="auth-actions">
          <div className="auth-terms-wrap">
            <label className="auth-terms">
              <input
                type="checkbox"
                className="auth-check"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span className="auth-terms-text">
                Tôi đồng ý với{' '}
                <a href="#" className="auth-link" onClick={stopLink}>Điều khoản sử dụng</a>
                {' '}và{' '}
                <a href="#" className="auth-link" onClick={stopLink}>Chính sách bảo mật</a>.
              </span>
            </label>
            {errors.agree && <p className="auth-error">{errors.agree}</p>}
          </div>

          {serverError && <p className="auth-error" role="alert">{serverError}</p>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            {!submitting && <img src="/icons/arrow-right.svg" alt="" width="17" height="17" />}
          </button>
        </div>

        <hr className="auth-divider" />

        <p className="auth-switch">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
