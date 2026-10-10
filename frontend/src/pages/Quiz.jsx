import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client.js'
import QuestionCard from '../components/QuestionCard.jsx'
import AskAI from '../components/AskAI.jsx'

export default function Quiz() {
  const { chapterId } = useParams()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/questions/chapter/${chapterId}`)
      .then((res) => setQuestions(res.data))
      .catch(() => setError('Không tải được câu hỏi'))
  }, [chapterId])

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/quiz/submit', { chapterId: Number(chapterId), answers })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Nộp bài thất bại')
    }
  }

  const detailOf = (id) => result?.details.find((d) => d.question_id === id)

  return (
    <section>
      <h2>Quiz</h2>
      {error && <p className="error">{error}</p>}
      {!error && questions.length === 0 && <p className="muted">Chương này chưa có câu hỏi.</p>}

      {questions.map((q, i) => (
        <QuestionCard
          key={q.question_id}
          index={i}
          question={q}
          value={answers[q.question_id]}
          onChange={(v) => setAnswers((prev) => ({ ...prev, [q.question_id]: v }))}
          result={detailOf(q.question_id)}
        />
      ))}

      {result ? (
        <div className="card">
          <h3>Kết quả: {result.total_correct}/{result.total_questions} ({result.score}%)</h3>
          <Link to="/dashboard" className="button">Xem tiến độ</Link>
        </div>
      ) : (
        questions.length > 0 && <button onClick={handleSubmit}>Nộp bài</button>
      )}

      <AskAI chapterId={Number(chapterId)} />
    </section>
  )
}
