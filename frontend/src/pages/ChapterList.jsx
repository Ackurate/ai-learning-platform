import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client.js'

export default function ChapterList() {
  const [chapters, setChapters] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/chapters')
      .then((res) => setChapters(res.data))
      .catch(() => setError('Không tải được danh sách chương. Backend và database đã chạy chưa?'))
  }, [])

  return (
    <section>
      <h2>Danh sách chương</h2>
      {error && <p className="error">{error}</p>}
      {chapters.map((c) => (
        <div key={c.chapter_id} className="card">
          <h3>Chương {c.order_index}: {c.title}</h3>
          <p className="muted">{c.description}</p>
          <div className="row">
            <Link to={`/lesson/${c.chapter_id}`} className="button">Học bài</Link>
            <Link to={`/quiz/${c.chapter_id}`} className="button secondary">Làm quiz</Link>
          </div>
        </div>
      ))}
    </section>
  )
}
