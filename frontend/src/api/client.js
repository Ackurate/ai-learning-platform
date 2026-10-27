import axios from 'axios'

export const SESSION_UNLOCK_KEY = 'byte_cpp_session_unlock_all'

export function isSessionUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_UNLOCK_KEY) === 'true'
  } catch {
    return false
  }
}

export function setSessionUnlocked(enabled) {
  try {
    if (enabled) {
      sessionStorage.setItem(SESSION_UNLOCK_KEY, 'true')
    } else {
      sessionStorage.removeItem(SESSION_UNLOCK_KEY)
    }
  } catch (err) {
    console.error('Lỗi truy cập sessionStorage:', err)
  }
}

const api = axios.create({ baseURL: '/api' })

// Tự động gắn token đăng nhập và cờ mở khóa tạm thời (session) vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (isSessionUnlocked()) {
    config.headers['X-Preview-Mode'] = 'true'
  }
  return config
})

export default api
