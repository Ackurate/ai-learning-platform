import { createContext, useContext, useState } from 'react'
import api, { isSessionUnlocked, setSessionUnlocked } from '../api/client.js'

const AuthContext = createContext(null)

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)
  const [sessionActive, setSessionActive] = useState(isSessionUnlocked)

  const isAdmin = user?.role === 'admin'
  const previewUnlocked = Boolean(isAdmin && sessionActive)

  const save = ({ token, user: newUser }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    save(data)
  }

  const register = async (username, email, password) => {
    const { data } = await api.post('/auth/register', { username, email, password })
    save(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const togglePreviewUnlocked = (forcedValue) => {
    if (!isAdmin) return
    setSessionActive((current) => {
      const next = typeof forcedValue === 'boolean' ? forcedValue : !current
      setSessionUnlocked(next)
      return next
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        register,
        logout,
        previewUnlocked,
        togglePreviewUnlocked,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
