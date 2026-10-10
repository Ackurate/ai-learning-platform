import { useState } from 'react'
import api from '../api/client.js'

// Khung hỏi AI. Truyền chapterId (đang học) hoặc questionId (đang làm quiz) để AI có ngữ cảnh.
export default function AskAI({ chapterId, questionId }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAsk = async (e) => {
    e.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setError('')
    setAnswer('')
    try {
      const { data } = await api.post('/ai/ask', { question, chapterId, questionId })
      setAnswer(data.answer)
    } catch (err) {
      setError(err.response?.data?.message || 'Không hỏi được AI, thử lại sau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h3>Hỏi AI</h3>
      <form onSubmit={handleAsk} className="row">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Nhập câu hỏi về bài học..."
        />
        <button disabled={loading}>{loading ? 'Đang trả lời...' : 'Gửi'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {answer && <p className="ai-answer">{answer}</p>}
    </section>
  )
}
