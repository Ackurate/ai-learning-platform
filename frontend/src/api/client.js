import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Tự động gắn token đăng nhập vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
