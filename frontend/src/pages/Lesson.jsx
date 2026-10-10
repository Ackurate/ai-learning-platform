import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client.js'
import AskAI from '../components/AskAI.jsx'

export default function Lesson() {
  const { chapterId } = useParams()
  const [chapter, setChapter] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/chapters/${chapterId}`)
      .then((res) => setChapter(res.data))
      .catch(() => setError('Không tải được bài học'))
    // Đánh dấu đang học chương này
    api.put(`/progress/${chapterId}`, { status: 'in_progress' }).catch(() => {})
  }, [chapterId])

  if (error) return <p className="error">{error}</p>
  if (!chapter) return <p>Đang tải...</p>

  return (
    <section>
      <h2>Chương {chapter.order_index}: {chapter.title}</h2>
      <div className="card">
        <p>{chapter.description}</p>
        <p className="muted">Nội dung bài học chi tiết và phần trực quan hóa sẽ được bổ sung ở các tuần sau.</p>
      </div>
      <AskAI chapterId={chapter.chapter_id} />
      <div className="row">
        <Link to="/chapters" className="button secondary">Về danh sách</Link>
        <Link to={`/quiz/${chapter.chapter_id}`} className="button">Làm quiz</Link>
      </div>
    </section>
  )
}
