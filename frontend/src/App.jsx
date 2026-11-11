import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ChapterList from './pages/ChapterList.jsx'
import Quiz from './pages/Quiz.jsx'
import Dashboard from './pages/Dashboard.jsx'

const Lesson = lazy(() => import('./pages/Lesson.jsx'))

// Trang chỉ dành cho người đã đăng nhập
function Protected({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chapters" element={<ChapterList />} />
          <Route
            path="/lesson/:chapterId"
            element={
              <Protected>
                <Suspense fallback={<p role="status">Đang tải bài học…</p>}>
                  <Lesson />
                </Suspense>
              </Protected>
            }
          />
          <Route path="/quiz/:chapterId" element={<Protected><Quiz /></Protected>} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
