// Hiển thị một câu hỏi. Sau khi nộp bài, truyền result để hiện đúng/sai và giải thích.
export default function QuestionCard({ index, question, value, onChange, result }) {
  const disabled = Boolean(result)

  return (
    <div className={`card ${result ? (result.is_correct ? 'correct' : 'wrong') : ''}`}>
      <p><strong>Câu {index + 1}.</strong> {question.content}</p>

      {Array.isArray(question.options) && question.options.length > 0 ? (
        (question.options || []).map((opt) => (
          <label key={opt} className="option">
            <input
              type="radio"
              name={`q-${question.question_id}`}
              checked={value === opt}
              disabled={disabled}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))
      ) : (
        <textarea
          rows={4}
          value={value || ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập đáp án / code của bạn..."
        />
      )}

      {result && (
        <div className="feedback">
          <p>{result.is_correct ? 'Chính xác!' : `Chưa đúng. Đáp án: ${result.correct_answer}`}</p>
          {result.explanation && <p className="muted">{result.explanation}</p>}
        </div>
      )}
    </div>
  )
}
