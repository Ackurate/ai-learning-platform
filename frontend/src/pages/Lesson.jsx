import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '../api/client.js'
import AppShell from '../components/AppShell.jsx'
import AskAI from '../components/AskAI.jsx'
import Icon from '../components/HomeIcons.jsx'
import { cleanTitle, toList } from '../utils/chapters.js'
import {
  canAccessLesson,
  canNavigateToAnotherLesson,
  canTakeChapterQuiz,
} from '../utils/lesson-navigation.js'
import '../styles/lesson.css'

function LessonMarkdown({ children }) {
  return (
    <div className="lesson-markdown">
      <ReactMarkdown
        components={{
          h2: ({ children: heading }) => <h2>{heading}</h2>,
          h3: ({ children: heading }) => <h3>{heading}</h3>,
          pre: ({ children: code }) => (
            <div className="lesson-code">
              <div className="lesson-code-head">
                <Icon name="file-code-2" size={15} />
                <span>Ví dụ C++</span>
                <span className="lesson-code-lang">C++17</span>
              </div>
              <pre>{code}</pre>
            </div>
          ),
          blockquote: ({ children: note }) => (
            <aside className="lesson-callout">
              <strong>Ghi nhớ</strong>
              <div>{note}</div>
            </aside>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

function QuestionOptions({ question, value, onChange, disabled }) {
  return (
    <div className="lesson-options">
      {(question.options || []).map((option) => {
        const match = option.match(/^([A-D])\.\s*([\s\S]*)$/)
        const letter = match?.[1] ?? ''
        const label = match?.[2] ?? option
        return (
          <label className={`lesson-option${value === option ? ' is-selected' : ''}`} key={option}>
            <span className="lesson-option-letter">{letter}</span>
            <span className="lesson-option-text"><LessonMarkdown>{label}</LessonMarkdown></span>
            <input
              type="radio"
              name={`lesson-question-${question.question_id}`}
              value={option}
              checked={value === option}
              disabled={disabled}
              onChange={() => onChange(option)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default function Lesson() {
  const { chapterId } = useParams()
  const normalizedChapterId = Number(chapterId)
  const [phase, setPhase] = useState('loading')
  const [chapter, setChapter] = useState(null)
  const [lessons, setLessons] = useState([])
  const [activeLessonCode, setActiveLessonCode] = useState('')
  const [lessonProgress, setLessonProgress] = useState({})
  const [questions, setQuestions] = useState([])
  const [quizPhase, setQuizPhase] = useState('loading')
  const [quizError, setQuizError] = useState('')
  const [answers, setAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)
  const [checkingAnswers, setCheckingAnswers] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [progressError, setProgressError] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    setPhase('loading')
    setQuizPhase('loading')
    setQuizError('')
    setProgressError('')
    setQuizResult(null)
    setCheckingAnswers(false)
    setAnswers({})
    setActiveLessonCode('')
    setLessonProgress({})

    if (!Number.isInteger(normalizedChapterId) || normalizedChapterId < 1 || normalizedChapterId > 7) {
      setPhase('error')
      return undefined
    }

    Promise.all([
      api.get(`/chapters/${normalizedChapterId}`),
      api.get(`/chapters/${normalizedChapterId}/lessons`),
      api.get(`/progress/lessons/${normalizedChapterId}`).catch((error) => ({ error })),
    ])
      .then(([chapterResponse, lessonsResponse, progressResponse]) => {
        if (ignore) return
        const lessonList = toList(lessonsResponse, 'lessons')
        if (progressResponse.error) {
          setProgressError('Không tải được tiến độ bài học đã lưu.')
        } else {
          setProgressError('')
          setLessonProgress(Object.fromEntries(
            toList(progressResponse, 'progress').map(({ lesson_id, status }) => [lesson_id, status]),
          ))
        }
        setChapter(chapterResponse.data)
        setLessons(lessonList)
        setActiveLessonCode(lessonList[0]?.lesson_code ?? '')
        setPhase('ready')
      })
      .catch(() => {
        if (!ignore) setPhase('error')
      })

    api.put(`/progress/${normalizedChapterId}`, { status: 'in_progress' })
      .catch(() => {
        if (!ignore) setProgressError('Không cập nhật được tiến độ học tập.')
      })

    return () => {
      ignore = true
    }
  }, [normalizedChapterId, attempt])

  const activeIndex = lessons.findIndex((lesson) => lesson.lesson_code === activeLessonCode)
  const activeLesson = activeIndex >= 0 ? lessons[activeIndex] : null

  useEffect(() => {
    if (!activeLesson?.lesson_id || lessonProgress[activeLesson.lesson_id]) return

    api.put(`/progress/lessons/${normalizedChapterId}/${activeLesson.lesson_id}`, { status: 'in_progress' })
      .then(() => {
        setLessonProgress((current) => ({
          ...current,
          [activeLesson.lesson_id]: current[activeLesson.lesson_id] === 'completed'
            ? 'completed'
            : 'in_progress',
        }))
        setProgressError('')
      })
      .catch(() => setProgressError('Không lưu được tiến độ bài học.'))
  }, [normalizedChapterId, activeLesson?.lesson_id, lessonProgress])

  useEffect(() => {
    let ignore = false
    setQuestions([])
    setQuizPhase('loading')
    setQuizError('')

    if (!activeLesson?.lesson_id) return undefined

    api.get(`/chapters/${normalizedChapterId}/lessons/${activeLesson.lesson_id}/questions`)
      .then((response) => {
        if (ignore) return
        setQuestions(toList(response, 'questions'))
        setQuizPhase('ready')
      })
      .catch(() => {
        if (!ignore) {
          setQuizError('Không tải được câu hỏi kiểm tra. Hãy thử tải lại trang.')
          setQuizPhase('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [normalizedChapterId, activeLesson?.lesson_id, attempt])

  const selfCheckQuestions = useMemo(
    () => questions.filter((question) => Array.isArray(question.options) && question.options.length > 0).slice(0, 2),
    [questions],
  )
  const completedCount = quizResult?.total_correct ?? 0
  const answeredCount = selfCheckQuestions.filter((question) => answers[question.question_id]).length
  const quizProgress = selfCheckQuestions.length ? Math.round((answeredCount / selfCheckQuestions.length) * 100) : 0
  const completedLessons = lessons.filter((lesson) => lessonProgress[lesson.lesson_id] === 'completed').length
  const lessonProgressPercent = lessons.length ? Math.round((completedLessons / lessons.length) * 100) : 0
  const canSwitchLessons = canNavigateToAnotherLesson({
    alreadyCompleted: lessonProgress[activeLesson?.lesson_id] === 'completed',
    questionsReady: quizPhase === 'ready',
    questionCount: selfCheckQuestions.length,
    answeredCount,
    checked: Boolean(quizResult),
  })
  const canStartChapterQuiz = canTakeChapterQuiz(lessons, lessonProgress)

  const selectLesson = (lesson) => {
    if (lesson.lesson_code === activeLessonCode) return
    const targetIndex = lessons.findIndex((item) => item.lesson_id === lesson.lesson_id)
    if (!canAccessLesson(lessons, lessonProgress, targetIndex)) {
      setSubmitError('Hoàn thành các bài học phía trên trước khi chuyển tới bài này.')
      return
    }
    if (!canSwitchLessons) {
      setSubmitError('Trả lời đủ 2 câu và nhấn Kiểm tra trước khi chuyển bài học.')
      return
    }
    setActiveLessonCode(lesson.lesson_code)
    setVisited((current) => current.includes(lesson.lesson_code) ? current : [...current, lesson.lesson_code])
    setQuestions([])
    setQuizPhase('loading')
    setAnswers({})
    setQuizResult(null)
    setCheckingAnswers(false)
    setSubmitError('')
  }

  const checkAnswers = async () => {
    if (checkingAnswers) return
    if (selfCheckQuestions.length !== 2 || selfCheckQuestions.some((question) => !answers[question.question_id])) {
      setSubmitError('Hãy chọn đáp án cho cả 2 câu hỏi.')
      return
    }

    setCheckingAnswers(true)
    setSubmitError('')
    try {
      const { data } = await api.post('/quiz/check-lesson', {
        lessonId: activeLesson.lesson_id,
        chapterId: normalizedChapterId,
        answers: Object.fromEntries(selfCheckQuestions.map((question) => [
          question.question_id,
          answers[question.question_id],
        ])),
      })
      setQuizResult(data)
      setLessonProgress((current) => ({ ...current, [activeLesson.lesson_id]: 'completed' }))
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Không thể kiểm tra câu trả lời. Hãy thử lại.')
    } finally {
      setCheckingAnswers(false)
    }
  }

  if (phase === 'error') {
    return (
      <AppShell activeKey="learn">
        <div className="lesson-message" role="alert">
          <h1>Không tải được bài học</h1>
          <p>Không tải được dữ liệu chương. Kiểm tra kết nối rồi thử lại.</p>
          <div className="lesson-message-actions">
            <button type="button" className="lesson-button lesson-button--primary" onClick={() => setAttempt((value) => value + 1)}>
              Thử lại
            </button>
            <Link className="lesson-button lesson-button--secondary" to="/chapters">Về danh sách chương</Link>
          </div>
        </div>
      </AppShell>
    )
  }

  if (phase === 'loading') {
    return (
      <AppShell activeKey="learn">
        <p className="lesson-loading" role="status">Đang tải nội dung bài học…</p>
      </AppShell>
    )
  }

  if (!chapter) return <Navigate to="/chapters" replace />

  return (
    <AppShell activeKey="learn">
      <div className="lesson-page">
        <nav className="lesson-breadcrumb" aria-label="Điều hướng">
          <Link to="/chapters">
            <img src="/assets/lesson-arrow-left.svg" alt="" />
            Các chương
          </Link>
          <span aria-hidden="true">/</span>
          <span>Chương {chapter.order_index}: {cleanTitle(chapter.title)}</span>
        </nav>

        {progressError && <p className="lesson-inline-alert" role="status">{progressError}</p>}

        {lessons.length === 0 ? (
          <div className="lesson-message">
            <h1>Chưa có nội dung bài học</h1>
            <p>Chạy lệnh nạp dữ liệu để đồng bộ các bài Markdown trong thư mục database/.</p>
            <Link className="lesson-button lesson-button--secondary" to="/chapters">Về danh sách chương</Link>
          </div>
        ) : (
          <div className="lesson-layout">
            <aside className="lesson-navigation" aria-label="Danh sách bài trong chương">
              <div className="lesson-navigation-heading">
                <div>
                  <p className="lesson-eyebrow">CHƯƠNG {chapter.order_index}</p>
                  <h2>{cleanTitle(chapter.title)}</h2>
                </div>
                <Icon name="chevron-down" size={16} />
              </div>
              {!canSwitchLessons && (
                <p className="lesson-navigation-hint">
                  Trả lời đủ 2 câu và nhấn Kiểm tra để chuyển bài.
                </p>
              )}
              {canSwitchLessons && lessons.some((_, index) => (
                !canAccessLesson(lessons, lessonProgress, index)
              )) && (
                <p className="lesson-navigation-hint">
                  Hoàn thành các bài học theo thứ tự để mở khóa bài tiếp theo.
                </p>
              )}
              <div className="lesson-navigation-list">
                {lessons.map((lesson, index) => {
                  const active = lesson.lesson_code === activeLessonCode
                  const status = lessonProgress[lesson.lesson_id] ?? 'not_started'
                  const hasVisited = status !== 'not_started'
                  const completed = status === 'completed'
                  const canAccess = canAccessLesson(lessons, lessonProgress, index)
                  const disabled = !active && (!canSwitchLessons || !canAccess)
                  const disabledTitle = !canAccess
                    ? 'Hoàn thành các bài học phía trên để mở khóa'
                    : 'Trả lời đủ 2 câu và kiểm tra trước khi chuyển bài'
                  return (
                    <button
                      type="button"
                      className={`lesson-nav-item${active ? ' is-active' : ''}`}
                      aria-current={active ? 'step' : undefined}
                      aria-disabled={disabled}
                      disabled={disabled}
                      title={disabled ? disabledTitle : undefined}
                      key={lesson.lesson_code}
                      onClick={() => selectLesson(lesson)}
                    >
                      <span className={`lesson-nav-index${hasVisited ? ' is-visited' : ''}`}>
                        {completed ? '✓' : String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="lesson-nav-copy">
                        <span>{cleanTitle(lesson.title)}</span>
                        <span className={completed ? 'is-completed-status' : active ? 'is-active-status' : hasVisited ? 'is-visited-status' : ''}>
                          {completed ? 'Hoàn thành' : active ? 'Đang học' : hasVisited ? 'Đã xem' : 'Chưa học'}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <Link className="lesson-back-link" to="/chapters">
                <img src="/assets/lesson-arrow-left.svg" alt="" />
                Về danh sách chương
              </Link>
            </aside>

            {activeLesson && (
              <div className="lesson-content">
                <header className="lesson-heading">
                  <div className="lesson-heading-title">
                    <p className="lesson-eyebrow">CHƯƠNG {chapter.order_index} / BÀI {activeLesson.lesson_code}</p>
                    <h1>{cleanTitle(activeLesson.title)}</h1>
                    {activeLesson.description && <p className="lesson-description">{activeLesson.description}</p>}
                  </div>
                  <div className="lesson-meta">
                    <span>{Math.max(1, Math.ceil((activeLesson.content.trim().split(/\s+/).length || 1) / 180))} phút đọc</span>
                    <span aria-hidden="true">·</span>
                    <span>Bài {activeIndex + 1} / {lessons.length}</span>
                    <span className="lesson-meta-status">
                      {lessonProgress[activeLesson.lesson_id] === 'completed' ? 'Đã hoàn thành' : 'Đang học'}
                    </span>
                  </div>
                  <div className="lesson-progress">
                    <div className="lesson-progress-label">
                      <span>Tiến độ bài học</span>
                      <span>{lessonProgressPercent}%</span>
                    </div>
                    <div className="lesson-progress-track" role="progressbar" aria-valuenow={lessonProgressPercent} aria-valuemin="0" aria-valuemax="100">
                      <span style={{ width: `${lessonProgressPercent}%` }} />
                    </div>
                  </div>
                </header>

                <article className="lesson-article" aria-label="Nội dung bài học">
                  <LessonMarkdown>{activeLesson.content}</LessonMarkdown>
                </article>

                <section className="lesson-check" aria-labelledby="lesson-check-title">
                  <div className="lesson-check-heading">
                    <div>
                      <p className="lesson-eyebrow">KIỂM TRA KẾT QUẢ</p>
                      <h2 id="lesson-check-title">Trả lời 2 câu để kiểm tra kiến thức</h2>
                      <p>Chọn đáp án phù hợp nhất cho mỗi câu hỏi.</p>
                    </div>
                    {selfCheckQuestions.length > 0 && (
                      <span className="lesson-check-count">{quizResult ? `${completedCount}/2 đúng` : `${answeredCount}/2 đã chọn`}</span>
                    )}
                  </div>

                  {quizError ? (
                    <p className="lesson-inline-alert" role="alert">{quizError}</p>
                  ) : quizPhase === 'loading' ? (
                    <p className="lesson-quiz-loading" role="status">Đang tải câu hỏi…</p>
                  ) : selfCheckQuestions.length < 2 ? (
                    <div className="lesson-check-empty">
                      <p>Chương này chưa có đủ câu hỏi trắc nghiệm cho phần ôn tập nhanh.</p>
                      {canStartChapterQuiz ? (
                        <Link className="lesson-button lesson-button--secondary" to={`/quiz/${chapter.chapter_id}`}>Mở bài kiểm tra</Link>
                      ) : (
                        <p>Hoàn thành các bài học trong chương để mở bài kiểm tra cuối chương.</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="lesson-quiz-progress">
                        <div>
                          <span>Đã trả lời {quizResult ? 2 : answeredCount}/2 câu</span>
                          <span>{quizResult ? 100 : quizProgress}%</span>
                        </div>
                        <div className="lesson-quiz-progress-track" role="progressbar" aria-valuenow={quizResult ? 100 : quizProgress} aria-valuemin="0" aria-valuemax="100">
                          <span style={{ width: `${quizResult ? 100 : quizProgress}%` }} />
                        </div>
                      </div>
                      <div className="lesson-question-list">
                        {selfCheckQuestions.map((question, index) => {
                          const detail = quizResult?.details.find((item) => item.question_id === question.question_id)
                          return (
                            <fieldset className="lesson-question" key={question.question_id} disabled={Boolean(quizResult)}>
                              <legend>
                                <span>Câu {index + 1} · {question.difficulty === 'easy' ? 'Cơ bản' : question.difficulty === 'hard' ? 'Nâng cao' : 'Vận dụng'}</span>
                                {detail && <span className={detail.is_correct ? 'lesson-answer-status is-correct' : 'lesson-answer-status is-wrong'}>{detail.is_correct ? 'Chính xác' : 'Chưa đúng'}</span>}
                              </legend>
                              <div className="lesson-question-content"><LessonMarkdown>{question.content}</LessonMarkdown></div>
                              <QuestionOptions
                                question={question}
                                value={answers[question.question_id]}
                                onChange={(value) => setAnswers((current) => ({ ...current, [question.question_id]: value }))}
                                disabled={Boolean(quizResult)}
                              />
                              {detail?.explanation && <p className="lesson-explanation">{detail.explanation}</p>}
                            </fieldset>
                          )
                        })}
                      </div>
                      {submitError && <p className="lesson-inline-alert" role="alert">{submitError}</p>}
                      <div className="lesson-check-actions">
                        <p>
                          {quizResult
                            ? `Bạn đã trả lời đúng ${completedCount}/2 câu. Có thể chuyển sang bài khác.`
                            : 'Hoàn thành cả 2 câu và nhấn Kiểm tra để mở khóa bài khác.'}
                        </p>
                        <button
                          type="button"
                          className="lesson-button lesson-button--primary"
                          onClick={checkAnswers}
                          disabled={Boolean(quizResult) || checkingAnswers}
                        >
                          {quizResult ? 'Đã kiểm tra' : checkingAnswers ? 'Đang kiểm tra…' : 'Kiểm tra'}
                          {!quizResult && !checkingAnswers && <Icon name="arrow-right" size={16} />}
                        </button>
                      </div>
                    </>
                  )}
                </section>

                <nav className="lesson-pager" aria-label="Điều hướng bài học">
                  <div>
                    <span>BÀI TRƯỚC</span>
                    {activeIndex > 0 ? (
                      <button
                        type="button"
                        onClick={() => selectLesson(lessons[activeIndex - 1])}
                        disabled={!canSwitchLessons || !canAccessLesson(lessons, lessonProgress, activeIndex - 1)}
                        title={!canAccessLesson(lessons, lessonProgress, activeIndex - 1)
                          ? 'Hoàn thành các bài học phía trên để mở khóa'
                          : !canSwitchLessons ? 'Trả lời đủ 2 câu và kiểm tra trước khi chuyển bài' : undefined}
                      >
                        {cleanTitle(lessons[activeIndex - 1].title)}
                      </button>
                    ) : <span className="lesson-pager-disabled">Đây là bài đầu tiên</span>}
                  </div>
                  <div>
                    <span>BÀI TIẾP THEO</span>
                    {activeIndex < lessons.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => selectLesson(lessons[activeIndex + 1])}
                        disabled={!canSwitchLessons || !canAccessLesson(lessons, lessonProgress, activeIndex + 1)}
                        title={!canAccessLesson(lessons, lessonProgress, activeIndex + 1)
                          ? 'Hoàn thành các bài học phía trên để mở khóa'
                          : !canSwitchLessons ? 'Trả lời đủ 2 câu và kiểm tra trước khi chuyển bài' : undefined}
                      >
                        {cleanTitle(lessons[activeIndex + 1].title)}
                      </button>
                    ) : canStartChapterQuiz ? (
                      <Link className="lesson-pager-link" to={`/quiz/${chapter.chapter_id}`}>Làm bài kiểm tra chương</Link>
                    ) : (
                      <span className="lesson-pager-link is-disabled" aria-disabled="true">
                        Hoàn thành bài học để mở bài kiểm tra
                      </span>
                    )}
                  </div>
                  <p>
                    {!canSwitchLessons
                      ? 'Hãy trả lời đủ 2 câu và nhấn Kiểm tra để mở khóa điều hướng bài học.'
                      : 'Tiến độ bài học được lưu theo tài khoản của bạn.'}
                  </p>
                </nav>

                <div className="lesson-ai" id="lesson-ai" hidden={!chatOpen}>
                  <AskAI chapterId={chapter.chapter_id} />
                </div>
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          className="lesson-chat"
          aria-label={chatOpen ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
          aria-expanded={chatOpen}
          aria-controls="lesson-ai"
          onClick={() => setChatOpen((open) => !open)}
        >
          {chatOpen ? <Icon name="x" size={21} /> : <img src="/assets/lesson-message-circle.svg" alt="" />}
        </button>
      </div>
    </AppShell>
  )
}
