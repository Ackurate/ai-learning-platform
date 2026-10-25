import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AuthLayout from '../components/AuthLayout.jsx'
import { TextField, PasswordField } from '../components/AuthFields.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Đăng nhập chỉ kiểm tra đã nhập đủ chưa, không áp quy tắc độ mạnh mật khẩu
// để tài khoản cũ (mật khẩu 6 ký tự) vẫn vào được.
function validate({ email, password }) {
  const errors = {}

  const mail = email.trim()
  if (!mail) errors.email = 'Vui lòng nhập email.'
  else if (!EMAIL_RE.test(mail)) errors.email = 'Email không hợp lệ.'

  if (!password) errors.password = 'Vui lòng nhập mật khẩu.'

  return errors
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const found = validate({ email, password })
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/chapters')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  // "Quên mật khẩu?" tạm để trống, chưa có chức năng đặt lại mật khẩu
  const stopLink = (e) => e.preventDefault()

  return (
    <AuthLayout
      asideTitle={['Tiếp tục từ nơi', 'bạn đã bắt đầu.']}
      asideText="Ôn lại một khái niệm, thử một ví dụ. Mỗi lần thực hành là một bước tiến."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-intro">
          <p className="auth-eyebrow">ĐĂNG NHẬP</p>
          <h1 className="auth-title">Chào mừng bạn trở lại</h1>
          <p className="auth-lead">
            Đăng nhập để tiếp tục bài học và từng bước xây dựng nền tảng C++ của bạn.
          </p>
        </div>

        <div className="auth-fields">
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
            placeholder="Nhập mật khẩu của bạn"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <div className="auth-actions">
          <div className="auth-prefs">
            <label className="auth-remember">
              <input
                type="checkbox"
                className="auth-check"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="auth-link" onClick={stopLink}>Quên mật khẩu?</a>
          </div>

          {serverError && <p className="auth-error" role="alert">{serverError}</p>}

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            {!submitting && <img src="/icons/arrow-right.svg" alt="" width="17" height="17" />}
          </button>
        </div>

        <hr className="auth-divider" />

        <p className="auth-switch">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
