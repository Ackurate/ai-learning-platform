import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import api from '../api/client.js'
import AppShell from '../components/AppShell.jsx'
import AskAI from '../components/AskAI.jsx'
import Icon from '../components/HomeIcons.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { buildChapterItems, cleanTitle, pickCurrent, toList } from '../utils/chapters.js'
import '../styles/dashboard.css'

function DashboardTutor() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="db-tutor">
      <div
        className="db-tutor-panel"
        id="db-ai-dialog"
        role="dialog"
        aria-label="Hỏi AI Tutor"
        hidden={!open}
      >
        <button
          type="button"
          className="db-tutor-close"
          aria-label="Đóng cửa sổ Hỏi AI"
          onClick={() => setOpen(false)}
        >
          <Icon name="x" size={18} />
        </button>
        <AskAI />
      </div>
      <button
        type="button"
        className="db-tutor-launcher"
        aria-expanded={open}
        aria-controls="db-ai-dialog"
        aria-label={open ? 'Đóng Hỏi AI Tutor' : 'Mở Hỏi AI Tutor'}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? 'x' : 'sparkles'} size={20} />
        <span>{open ? 'Đóng' : 'Hỏi AI'}</span>
      </button>
    </div>
  )
}

function StatCard({ label, value, caption, icon, progress }) {
  return (
    <article className="db-stat">
      <div className="db-stat-heading">
        <span>{label}</span>
        {icon && <Icon name={icon} size={17} />}
      </div>
      <strong className="db-stat-value">{value}</strong>
      {progress !== undefined && (
        <div
          className="db-stat-progress"
          role="progressbar"
          aria-label={label}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
      <p className="db-stat-caption">{caption}</p>
    </article>
  )
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState({ chapters: [], progress: [], history: [] })
  const [phase, setPhase] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!user) return undefined
    let ignore = false
    setPhase('loading')

    Promise.all([api.get('/chapters'), api.get('/progress'), api.get('/quiz/history')])
      .then(([chaptersResponse, progressResponse, historyResponse]) => {
        if (ignore) return
        setData({
          chapters: toList(chaptersResponse, 'chapters'),
          progress: toList(progressResponse, 'progress'),
          history: toList(historyResponse, 'results'),
        })
        setPhase('ready')
      })
      .catch(() => {
        if (!ignore) setPhase('error')
      })

    return () => {
      ignore = true
    }
  }, [user, attempt])

  const chapterItems = useMemo(
    () => buildChapterItems(data.chapters, data.progress),
    [data.chapters, data.progress],
  )
  const currentChapter = useMemo(() => pickCurrent(chapterItems), [chapterItems])
  const latestQuizByChapter = useMemo(() => {
    const latest = new Map()
    data.history.forEach((result) => {
      const chapterId = Number(result.chapter_id)
      if (!latest.has(chapterId)) latest.set(chapterId, result)
    })
    return latest
  }, [data.history])

  if (authLoading) return null
  if (!user) return <Navigate to="/login" replace />

  const totalChapters = chapterItems.length
  const completedChapters = chapterItems.filter((chapter) => chapter.status === 'completed').length
  const completedQuizzes = chapterItems.filter((chapter) => (
    latestQuizByChapter.has(Number(chapter.chapter_id))
  )).length
  const progressPercent = totalChapters ? Math.round((completedChapters / totalChapters) * 100) : 0
  const displayName = user.username || user.email || 'bạn'

  return (
    <AppShell activeKey="dashboard" title="Dashboard" subtitle="Hồ sơ học tập và lý thuyết của bạn">
      <div className="db-dashboard">
        <header className="db-heading">
          <p className="db-eyebrow">TỔNG QUAN / C++</p>
          <h1>Xin chào, {displayName} 👋</h1>
          <p>Tiếp tục hành trình học C++ của bạn.</p>
        </header>

        {phase === 'loading' ? (
          <div className="db-loading" role="status" aria-live="polite">
            Đang tải tiến độ học tập…
          </div>
        ) : phase === 'error' ? (
          <div className="db-notice" role="alert">
            <p>Không tải được dữ liệu Dashboard. Kiểm tra kết nối rồi thử lại.</p>
            <button type="button" className="db-button db-button--secondary" onClick={() => setAttempt((n) => n + 1)}>
              Thử lại
            </button>
          </div>
        ) : totalChapters === 0 ? (
          <div className="db-notice">
            <p>Chưa có chương học nào để hiển thị.</p>
            <Link className="db-button db-button--secondary" to="/chapters">Xem chương học</Link>
          </div>
        ) : (
          <>
            <section className="db-continue" aria-labelledby="db-continue-title">
              <div className="db-continue-copy">
                <p className="db-card-eyebrow">{currentChapter ? 'TIẾP TỤC HỌC' : 'CHÚC MỪNG BẠN'}</p>
                <h2 id="db-continue-title">
                  {currentChapter ? cleanTitle(currentChapter.title) : 'Bạn đã hoàn thành tất cả chương học'}
                </h2>
                <p className="db-continue-description">
                  {currentChapter
                    ? currentChapter.description || `Chương ${currentChapter.number} trong lộ trình C++ của bạn.`
                    : 'Hãy ôn tập kiến thức hoặc làm lại các bài trắc nghiệm cuối chương.'}
                </p>
                <div className="db-continue-progress">
                  <div>
                    <span>Tiến độ bài học</span>
                    <strong>{progressPercent}%</strong>
                  </div>
                  <div className="db-progress-track" aria-hidden="true">
                    <span style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                {currentChapter ? (
                  <Link to={`/lesson/${currentChapter.chapter_id}`} className="db-button db-button--primary">
                    {currentChapter.status === 'in_progress' ? 'Tiếp tục học' : 'Bắt đầu học'}
                    <Icon name="arrow-right" size={17} />
                  </Link>
                ) : (
                  <Link to="/chapters" className="db-button db-button--secondary">Xem lộ trình</Link>
                )}
              </div>
            </section>

            <section className="db-stats" aria-label="Thống kê học tập">
              <StatCard
                label="Tiến độ học tập"
                value={`${progressPercent}%`}
                caption={`${completedChapters}/${totalChapters} chương hoàn thành`}
                icon="route"
                progress={progressPercent}
              />
              <StatCard
                label="Chương đã học"
                value={`${completedChapters}/${totalChapters}`}
                caption="Số chương đã hoàn thành"
                icon="book-open"
              />
              <StatCard
                label="Trắc nghiệm cuối chương"
                value={`${completedQuizzes}/${totalChapters}`}
                caption="Bài trắc nghiệm đã làm"
                icon="square-terminal"
              />
            </section>

            <div className="db-content-grid">
              <section className="db-panel db-roadmap" aria-labelledby="db-roadmap-title">
                <div className="db-panel-heading">
                  <div>
                    <h2 id="db-roadmap-title">Lộ trình học</h2>
                    <p>{totalChapters} chương trong lộ trình C++</p>
                  </div>
                  <span className="db-panel-count">{completedChapters}/{totalChapters}</span>
                </div>
                <div className="db-roadmap-progress">
                  <div>
                    <span>Tiến độ lý thuyết</span>
                    <strong>{progressPercent}%</strong>
                  </div>
                  <div className="db-progress-track" aria-hidden="true">
                    <span style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                <ol className="db-chapter-list">
                  {chapterItems.map((chapter) => {
                    const chapterClass = `db-chapter${chapter.status === 'in_progress' ? ' is-current' : ''}${chapter.locked ? ' is-locked' : ''}`
                    const content = (
                      <>
                        <span className={`db-chapter-number db-chapter-number--${chapter.status}`}>
                          {chapter.status === 'completed'
                            ? <Icon name="circle-check" size={17} />
                            : String(chapter.number).padStart(2, '0')}
                        </span>
                        <span className="db-chapter-copy">
                          <strong>{cleanTitle(chapter.title)}</strong>
                          <span>{chapter.status === 'in_progress' ? 'Đang học' : chapter.status === 'completed' ? 'Đã hoàn thành' : 'Chưa bắt đầu'}</span>
                        </span>
                        <Icon className="db-chapter-arrow" name={chapter.locked ? 'lock' : 'arrow-right'} size={16} />
                      </>
                    )

                    return (
                      <li key={chapter.chapter_id}>
                        {chapter.locked ? (
                          <div className={chapterClass} aria-disabled="true" title="Hoàn thành chương trước để mở khóa">
                            {content}
                          </div>
                        ) : (
                          <Link to={`/lesson/${chapter.chapter_id}`} className={chapterClass}>
                            {content}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ol>
                <Link to="/chapters" className="db-button db-button--secondary db-roadmap-link">
                  Xem tất cả chương
                </Link>
              </section>

              <section className="db-panel db-quizzes" aria-labelledby="db-quizzes-title">
                <div className="db-panel-heading">
                  <div>
                    <h2 id="db-quizzes-title">Trắc nghiệm cuối chương</h2>
                    <p>Trạng thái các bài trắc nghiệm của bạn</p>
                  </div>
                  <span className="db-panel-count">{completedQuizzes}/{totalChapters} đã làm</span>
                </div>
                <ul className="db-quiz-list">
                  {chapterItems.map((chapter) => {
                    const result = latestQuizByChapter.get(Number(chapter.chapter_id))
                    return (
                      <li key={chapter.chapter_id} className="db-quiz-row">
                        <span className={`db-quiz-icon${result ? ' is-done' : ''}`}>
                          <Icon name={result ? 'circle-check' : 'square-terminal'} size={17} />
                        </span>
                        <span className="db-quiz-copy">
                          <strong>Trắc nghiệm chương {chapter.number}</strong>
                          <span>{cleanTitle(chapter.title)}</span>
                        </span>
                        {result ? (
                          <span className="db-quiz-result">
                            <span className="db-status db-status--completed">Đã làm</span>
                            <strong>{Number(result.score)}%</strong>
                          </span>
                        ) : (
                          <span className="db-quiz-result">
                            <span className="db-status db-status--not_started">Chưa làm</span>
                            {chapter.locked ? (
                              <span className="db-quiz-action is-locked" aria-disabled="true">Chưa mở</span>
                            ) : (
                              <Link to={`/quiz/${chapter.chapter_id}`} className="db-quiz-action">Bắt đầu</Link>
                            )}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            </div>
          </>
        )}
      </div>
      <DashboardTutor />
    </AppShell>
  )
}
