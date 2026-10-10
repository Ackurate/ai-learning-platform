import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await register(username, email, password)
      navigate('/chapters')
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h2>Đăng ký</h2>
      <input placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mật khẩu (tối thiểu 6 ký tự)" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button>Tạo tài khoản</button>
      <p className="muted">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </form>
  )
}
