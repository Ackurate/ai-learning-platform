import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '../api/client.js'
import AppShell from '../components/AppShell.jsx'
import AskAI from '../components/AskAI.jsx'
import Icon from '../components/HomeIcons.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { cleanTitle } from '../utils/chapters.js'
import '../styles/quiz.css'

const QUIZ_DURATION = 20 * 60

function getCodeText(node) {
  return Children.toArray(node).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return String(child)
    return isValidElement(child) ? getCodeText(child.props.children) : ''
  }).join('')
}

function Markdown({ children, code = false, inline = false }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children: paragraph }) => inline ? <span>{paragraph}</span> : <p>{paragraph}</p>,
        pre: ({ children: codeChildren }) => {
          const lines = getCodeText(codeChildren).replace(/\n$/, '').split('\n')
          return (
            <div className="quiz-code">
              <div className="quiz-code__header">
                <span><Icon name="file-code-2" size={15} /> C++17</span>
                <span>{code ? 'Đoạn mã' : 'Ví dụ C++'}</span>
              </div>
              <pre aria-label="Mã nguồn C++">
                {lines.map((line, index) => (
                  <span className="quiz-code__line" key={index}>
                    <span className="quiz-code__number" aria-hidden="true">{index + 1}</span>
                    <code>{line || ' '}</code>
                  </span>
                ))}
              </pre>
            </div>
          )
        },
      }}
    >
      {children || ''}
    </ReactMarkdown>
  )
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

function getOption(option) {
  const match = option.match(/^([A-D])\.\s*([\s\S]*)$/)
  return { letter: match?.[1] ?? String.fromCharCode(65), label: match?.[2] ?? option }
}

function QuizTimer({ seconds }) {
  return (
    <div className={`quiz-timer${seconds <= 60 ? ' is-warning' : ''}`} aria-live="off">
      <Icon name="clock" size={17} />
      <span className="quiz-timer__copy">
        <span>Thời gian còn lại</span>
        <strong>{formatTime(seconds)}</strong>
      </span>
    </div>
  )
}

function QuestionNumber({ index, active, answered, flagged, onClick }) {
  const state = flagged ? 'is-flagged' : answered ? 'is-answered' : ''

  return (
    <button
      type="button"
      className={`quiz-number${active ? ' is-current' : ''}${state ? ` ${state}` : ''}`}
      onClick={onClick}
      aria-label={`Câu ${index + 1}${answered ? ', đã trả lời' : ', chưa trả lời'}${flagged ? ', đánh dấu xem lại' : ''}`}
      aria-current={active ? 'step' : undefined}
      title={`Câu ${index + 1}`}
    >
      {String(index + 1).padStart(2, '0')}
      {flagged && <Icon className="quiz-number__flag" name="flag" size={11} />}
    </button>
  )
}

function AnswerOption({ option, questionId, value, onChange, disabled }) {
  const { letter, label } = getOption(option)
  const selected = value === option

  return (
    <label className={`quiz-option${selected ? ' is-selected' : ''}${disabled ? ' is-disabled' : ''}`}>
      <span className="quiz-option__letter">{letter}</span>
      <span className="quiz-option__text"><Markdown inline>{label}</Markdown></span>
      <input
        type="radio"
        name={`quiz-question-${questionId}`}
        value={option}
        checked={selected}
        disabled={disabled}
        onChange={() => onChange(option)}
      />
      <span className="quiz-option__indicator" aria-hidden="true">
        {selected && <Icon name="circle-check" size={16} />}
      </span>
    </label>
  )
}

function QuizQuestion({ question, index, total, value, onChange, flagged, onToggleFlag, submitted, onPrevious, onNext, isFirst, isLast }) {
  const options = Array.isArray(question.options) ? question.options : []
  const codeMatch = question.content.match(/```[\s\S]*?```/)
  const prompt = codeMatch
    ? question.content.slice(0, codeMatch.index).trim() || 'Đọc đoạn mã sau:'
    : question.content
  const codeBlock = codeMatch?.[0]
  const afterCode = codeMatch
    ? question.content.slice(codeMatch.index + codeMatch[0].length).trim()
    : ''

  return (
    <article className="quiz-question-card" aria-labelledby="quiz-question-title">
      <div className="quiz-question-card__meta">
        <span>CÂU {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span>1 điểm</span>
      </div>

      <h2 id="quiz-question-title" className="quiz-question-card__title"><Markdown>{prompt}</Markdown></h2>
      {codeBlock && <Markdown code>{codeBlock}</Markdown>}
      {afterCode && <div className="quiz-question-card__context"><Markdown>{afterCode}</Markdown></div>}
      <p className="quiz-question-card__hint">
        {question.question_type === 'code' ? 'Đọc kỹ đoạn mã và chọn kết quả đúng.' : 'Chọn một đáp án đúng.'}
      </p>

      {options.length > 0 ? (
        <div className="quiz-options" role="radiogroup" aria-labelledby="quiz-question-title">
          {options.map((option) => (
            <AnswerOption
              key={option}
              option={option}
              questionId={question.question_id}
              value={value}
              onChange={onChange}
              disabled={submitted}
            />
          ))}
        </div>
      ) : (
        <label className="quiz-answer-field">
          <span>Đáp án của bạn</span>
          <textarea
            rows={4}
            value={value || ''}
            disabled={submitted}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Nhập đáp án hoặc kết quả của bạn..."
          />
        </label>
      )}

      <div className="quiz-question-card__actions">
        <button
          type="button"
          className={`quiz-button quiz-button--review${flagged ? ' is-flagged' : ''}`}
          onClick={onToggleFlag}
          aria-pressed={flagged}
          disabled={submitted}
        >
          <Icon name="flag" size={15} />
          {flagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
        </button>
        <span className="quiz-autosave" aria-live="polite">
          {value ? <><Icon name="circle-check" size={13} /> Đã lưu đáp án</> : ''}
        </span>
      </div>

      <div className="quiz-question-card__pagination">
        <button type="button" className="quiz-button quiz-button--secondary" onClick={onPrevious} disabled={isFirst}>
          <span aria-hidden="true">←</span> Câu trước
        </button>
        <button type="button" className="quiz-button quiz-button--primary" onClick={onNext} disabled={isLast}>
          Câu tiếp <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </article>
  )
}

export default function Quiz() {
  const { chapterId } = useParams()
  const { user } = useAuth()
  const normalizedChapterId = Number(chapterId)
  const userKey = user?.user_id ?? user?.id ?? user?.email ?? user?.username ?? 'user'
  const draftKey = `byte-cpp-quiz:${userKey}:${normalizedChapterId}`
  const [phase, setPhase] = useState('loading')
  const [chapter, setChapter] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [secondsRemaining, setSecondsRemaining] = useState(QUIZ_DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [prerequisiteBlocked, setPrerequisiteBlocked] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [storageWarning, setStorageWarning] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draftReady, setDraftReady] = useState(false)
  const isSubmittingRef = useRef(false)
  const autoSubmitRef = useRef(false)
  const quizRequestRef = useRef(0)

  useEffect(() => {
    let ignore = false
    const requestId = ++quizRequestRef.current
    setPhase('loading')
    setDraftReady(false)
    setChapter(null)
    setQuestions([])
    setAnswers({})
    setFlagged([])
    setActiveIndex(0)
    setSecondsRemaining(QUIZ_DURATION)
    setSubmitted(false)
    setError('')
    setPrerequisiteBlocked(false)
    setSubmitError('')
    setStorageWarning('')
    setIsSubmitting(false)
    isSubmittingRef.current = false
    autoSubmitRef.current = false

    if (!Number.isInteger(normalizedChapterId) || normalizedChapterId < 1) {
      setError('Đường dẫn chương học không hợp lệ.')
      setPhase('error')
      return undefined
    }

    Promise.all([
      api.get(`/chapters/${normalizedChapterId}`),
      api.get(`/questions/chapter/${normalizedChapterId}`),
    ])
      .then(([chapterResponse, questionsResponse]) => {
        if (ignore || requestId !== quizRequestRef.current) return
        const loadedQuestions = Array.isArray(questionsResponse.data) ? questionsResponse.data : []
        let draft = null
        let warning = ''

        try {
          const saved = window.localStorage.getItem(draftKey)
          if (saved) draft = JSON.parse(saved)
        } catch {
          warning = 'Không thể đọc bản làm bài đã lưu trên thiết bị này.'
        }

        const questionIds = new Set(loadedQuestions.map((question) => String(question.question_id)))
        const savedAnswers = draft?.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers)
          ? Object.fromEntries(Object.entries(draft.answers).filter(([id, answer]) => questionIds.has(id) && typeof answer === 'string'))
          : {}
        const savedFlags = Array.isArray(draft?.flagged)
          ? draft.flagged.filter((id) => questionIds.has(String(id))).map(Number)
          : []
        const savedSubmitted = Boolean(draft?.submitted || draft?.result)

        setChapter(chapterResponse.data)
        setQuestions(loadedQuestions)
        setAnswers(savedAnswers)
        setFlagged(savedFlags)
        setActiveIndex(Math.min(Math.max(Number(draft?.activeIndex) || 0, 0), Math.max(loadedQuestions.length - 1, 0)))
        setSecondsRemaining(Number.isInteger(draft?.secondsRemaining)
          ? Math.min(Math.max(draft.secondsRemaining, 0), QUIZ_DURATION)
          : QUIZ_DURATION)
        setSubmitted(savedSubmitted)
        setStorageWarning(warning)
        setPhase('ready')
        setDraftReady(true)
        autoSubmitRef.current = false
      })
      .catch((requestError) => {
        if (ignore || requestId !== quizRequestRef.current) return
        setError(requestError.response?.data?.message || 'Không tải được bài trắc nghiệm. Vui lòng thử lại.')
        setPrerequisiteBlocked(requestError.response?.status === 403)
        setPhase('error')
      })

    return () => {
      ignore = true
    }
  }, [normalizedChapterId, draftKey])

  const answeredCount = useMemo(
    () => questions.filter((question) => Boolean(answers[question.question_id]?.trim())).length,
    [answers, questions],
  )
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0
  const activeQuestion = questions[activeIndex]
  const unansweredCount = questions.length - answeredCount
  const difficulty = questions.length > 0 && questions.every((question) => question.difficulty === questions[0].difficulty)
    ? ({ easy: 'Cơ bản', medium: 'Trung bình', hard: 'Nâng cao' }[questions[0].difficulty] || 'Cơ bản')
    : 'Tổng hợp'

  const submitQuiz = useCallback(async () => {
    if (isSubmittingRef.current || submitted || !questions.length) return
    const requestId = quizRequestRef.current
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await api.post('/quiz/submit', {
        chapterId: normalizedChapterId,
        answers,
      })
      if (requestId === quizRequestRef.current) setSubmitted(true)
    } catch (submitRequestError) {
      if (requestId === quizRequestRef.current) {
        setSubmitError(submitRequestError.response?.data?.message || 'Nộp bài thất bại. Vui lòng thử lại.')
      }
    } finally {
      if (requestId === quizRequestRef.current) {
        isSubmittingRef.current = false
        setIsSubmitting(false)
      }
    }
  }, [answers, normalizedChapterId, questions.length, submitted])

  useEffect(() => {
    if (phase !== 'ready' || submitted || secondsRemaining <= 0) return undefined
    const interval = window.setInterval(() => {
      setSecondsRemaining((remaining) => Math.max(remaining - 1, 0))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [phase, secondsRemaining, submitted])

  useEffect(() => {
    if (phase === 'ready' && secondsRemaining === 0 && !submitted && !autoSubmitRef.current) {
      autoSubmitRef.current = true
      submitQuiz()
    }
  }, [phase, secondsRemaining, submitQuiz, submitted])

  useEffect(() => {
    if (phase !== 'ready' || !draftReady) return
    try {
      window.localStorage.setItem(draftKey, JSON.stringify({
        answers,
        flagged,
        activeIndex,
        secondsRemaining,
        submitted,
      }))
    } catch {
      setStorageWarning('Không thể lưu tự động bài làm trên thiết bị này.')
    }
  }, [activeIndex, answers, draftKey, draftReady, flagged, phase, secondsRemaining, submitted])

  const updateAnswer = (value) => {
    if (!activeQuestion || submitted) return
    setAnswers((current) => ({ ...current, [activeQuestion.question_id]: value }))
  }
  const toggleFlag = () => {
    if (!activeQuestion || submitted) return
    setFlagged((current) => current.includes(activeQuestion.question_id)
      ? current.filter((id) => id !== activeQuestion.question_id)
      : [...current, activeQuestion.question_id])
  }
  const navigateToQuestion = (index) => {
    setActiveIndex(index)
    if (window.matchMedia('(max-width: 1119px)').matches) {
      document.querySelector('.quiz-question-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AppShell activeKey="quiz" title="Trắc nghiệm" subtitle="Củng cố kiến thức C++">
      <section className="quiz-page">
        <div className="quiz-heading">
          <Link className="quiz-breadcrumb" to={`/lesson/${normalizedChapterId}`}>
            <span aria-hidden="true">←</span>
            <span>Trắc nghiệm / Chương {chapter?.order_index || normalizedChapterId}{chapter ? `: ${cleanTitle(chapter.title)}` : ''}</span>
          </Link>
          {chapter && (
            <>
              <p className="quiz-eyebrow">CHƯƠNG {String(chapter.order_index || normalizedChapterId).padStart(2, '0')} / TRẮC NGHIỆM</p>
              <h1>{cleanTitle(chapter.title)}</h1>
              <p className="quiz-description">{chapter.description || 'Kiểm tra kiến thức C++ của bạn.'}</p>
              <p className="quiz-meta">{questions.length} câu hỏi <span>·</span> 20 phút <span>·</span> {difficulty}</p>
            </>
          )}
        </div>

        {phase === 'loading' && (
          <div className="quiz-loading" role="status" aria-live="polite">
            <span className="quiz-spinner" /> Đang tải câu hỏi...
          </div>
        )}

        {phase === 'error' && (
          <div className="quiz-notice" role="alert">
            <p>{error}</p>
            <Link
              className="quiz-button quiz-button--secondary"
              to={prerequisiteBlocked ? `/lesson/${normalizedChapterId}` : '/chapters'}
            >
              {prerequisiteBlocked ? 'Tiếp tục học bài' : 'Quay lại danh sách chương'}
            </Link>
          </div>
        )}

        {phase === 'ready' && questions.length === 0 && (
          <div className="quiz-notice">
            <p>Chương này chưa có câu hỏi trắc nghiệm.</p>
            <Link className="quiz-button quiz-button--secondary" to={`/lesson/${normalizedChapterId}`}>Quay lại bài học</Link>
          </div>
        )}

        {phase === 'ready' && questions.length > 0 && (
          <>
            <div className="quiz-status-bar">
              <div className="quiz-progress">
                <div className="quiz-progress__label">
                  <span>Đã trả lời {answeredCount}/{questions.length} câu</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="quiz-progress__track" role="progressbar" aria-label="Tiến độ làm bài" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
              <QuizTimer seconds={secondsRemaining} />
            </div>

            {storageWarning && <p className="quiz-storage-warning" role="status">{storageWarning}</p>}

            <div className="quiz-layout">
              <div className="quiz-main">
                {submitted && (
                  <section className="quiz-submitted" aria-live="polite">
                    <span className="quiz-submitted__icon"><Icon name="circle-check" size={22} /></span>
                    <div>
                      <p>Đã nộp bài thành công</p>
                      <h2>Tổng điểm sẽ hiển thị tại trang kết quả.</h2>
                    </div>
                  </section>
                )}

                {activeQuestion && (
                  <QuizQuestion
                    key={activeQuestion.question_id}
                    question={activeQuestion}
                    index={activeIndex}
                    total={questions.length}
                    value={answers[activeQuestion.question_id] || ''}
                    onChange={updateAnswer}
                    flagged={flagged.includes(activeQuestion.question_id)}
                    onToggleFlag={toggleFlag}
                    submitted={submitted}
                    onPrevious={() => navigateToQuestion(Math.max(activeIndex - 1, 0))}
                    onNext={() => navigateToQuestion(Math.min(activeIndex + 1, questions.length - 1))}
                    isFirst={activeIndex === 0}
                    isLast={activeIndex === questions.length - 1}
                  />
                )}

                <p className="quiz-save-note">
                  <Icon name="shield-check" size={15} />
                  {submitted
                    ? 'Đáp án đã được ghi nhận. Bạn có thể xem lại câu hỏi nhưng không thể thay đổi sau khi nộp.'
                    : 'Đáp án được lưu tự động trên thiết bị. Bạn có thể thay đổi trước khi nộp bài.'}
                </p>
                <details className="quiz-ai">
                  <summary>Gặp khó khăn? Hỏi AI về bài trắc nghiệm</summary>
                  <AskAI chapterId={normalizedChapterId} questionId={activeQuestion?.question_id} />
                </details>
              </div>

              <aside className="quiz-aside" aria-label="Tiến độ bài trắc nghiệm">
                <div className="quiz-aside__timer">
                  <QuizTimer seconds={secondsRemaining} />
                </div>
                <section className="quiz-question-list">
                  <div className="quiz-question-list__heading">
                    <h2>Danh sách câu hỏi</h2>
                    <span>{questions.length} câu</span>
                  </div>
                  <div className="quiz-aside__progress">
                    <div className="quiz-progress__label">
                      <span>Đã trả lời {answeredCount}/{questions.length} câu</span>
                      <strong>{progress}%</strong>
                    </div>
                    <div className="quiz-progress__track" role="progressbar" aria-label="Tiến độ làm bài" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                      <span style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="quiz-number-grid" aria-label="Chọn câu hỏi">
                    {questions.map((question, index) => (
                      <QuestionNumber
                        key={question.question_id}
                        index={index}
                        active={index === activeIndex}
                        answered={Boolean(answers[question.question_id]?.trim())}
                        flagged={flagged.includes(question.question_id)}
                        onClick={() => navigateToQuestion(index)}
                      />
                    ))}
                  </div>

                  <div className="quiz-legend" aria-label="Chú giải trạng thái câu hỏi">
                    <span><i className="is-answered" /> Đã trả lời: {answeredCount}</span>
                    <span><i className="is-current" /> Đang làm: {String(activeIndex + 1).padStart(2, '0')}</span>
                    <span><i /> Chưa trả lời: {unansweredCount}</span>
                    <span><Icon name="flag" size={12} /> Đánh dấu xem lại: {flagged.length}</span>
                  </div>

                  {!submitted && (
                    <>
                      <p className="quiz-submit-hint">
                        {unansweredCount
                          ? `Bạn còn ${unansweredCount} câu chưa trả lời. Bạn có thể quay lại kiểm tra trước khi nộp bài.`
                          : 'Bạn đã trả lời tất cả câu hỏi. Hãy kiểm tra lại trước khi nộp bài.'}
                      </p>
                      {submitError && <p className="quiz-submit-error" role="alert">{submitError}</p>}
                      <button type="button" className="quiz-button quiz-button--primary quiz-submit" onClick={submitQuiz} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                      </button>
                    </>
                  )}
                  {submitted && <p className="quiz-submitted-note">Bài làm đã hoàn tất.</p>}
                </section>

                <div className="quiz-aside-tip">
                  <strong>Làm bài theo nhịp của bạn</strong>
                  <p>Dùng “Đánh dấu xem lại” cho câu cần suy nghĩ thêm. Kết quả sẽ hiện sau khi nộp bài.</p>
                </div>
              </aside>
            </div>
          </>
        )}
      </section>
    </AppShell>
  )
}
