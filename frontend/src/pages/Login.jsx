import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/chapters')
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h2>Đăng nhập</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button>Đăng nhập</button>
      <p className="muted">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </form>
  )
}
