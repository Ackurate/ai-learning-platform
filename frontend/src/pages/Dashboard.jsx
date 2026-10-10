import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import api from '../api/client.js'

const STATUS_LABEL = {
  not_started: 'Chưa học',
  in_progress: 'Đang học',
  completed: 'Hoàn thành',
}

export default function Dashboard() {
  const [progress, setProgress] = useState([])
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.get('/progress'), api.get('/quiz/history')])
      .then(([p, h]) => {
        setProgress(p.data)
        setHistory(h.data)
      })
      .catch(() => setError('Không tải được dữ liệu tiến độ'))
  }, [])

  const done = progress.filter((p) => p.status === 'completed').length
  // Biểu đồ: các lần làm quiz theo thứ tự thời gian
  const chartData = [...history].reverse().map((h, i) => ({
    name: `Lần ${i + 1}`,
    score: Number(h.score),
  }))

  return (
    <section>
      <h2>Tiến độ học tập</h2>
      {error && <p className="error">{error}</p>}

      <div className="card">
        <p>Đã hoàn thành <strong>{done}/{progress.length}</strong> chương</p>
        {progress.map((p) => (
          <div key={p.chapter_id} className="row space">
            <span>Chương {p.order_index}: {p.title}</span>
            <span className={`badge ${p.status}`}>{STATUS_LABEL[p.status]}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Điểm các lần làm quiz</h3>
        {chartData.length === 0 ? (
          <p className="muted">Bạn chưa làm quiz nào.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}
