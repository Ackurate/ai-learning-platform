import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/AppShell';
import ChapterCard, { ChapterCardSkeleton } from '../components/ChapterCard';
import Icon from '../components/HomeIcons';
import { buildChapterItems, cleanTitle, pickCurrent, toList } from '../utils/chapters';
import '../styles/chapters.css';

export default function ChapterList() {
  const { user, loading } = useAuth();
  const loggedIn = Boolean(user);

  const [phase, setPhase] = useState('loading'); // loading | ready | error
  const [data, setData] = useState({ chapters: [], progress: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!loggedIn) return undefined;
    let ignore = false;
    setPhase('loading');

    Promise.all([api.get('/chapters'), api.get('/progress')])
      .then(([chaptersRes, progressRes]) => {
        if (ignore) return;
        setData({ chapters: toList(chaptersRes, 'chapters'), progress: toList(progressRes, 'progress') });
        setPhase('ready');
      })
      .catch(() => {
        if (!ignore) setPhase('error');
      });

    return () => {
      ignore = true;
    };
  }, [loggedIn, attempt]);

  const items = useMemo(() => buildChapterItems(data.chapters, data.progress), [data]);
  const current = useMemo(() => pickCurrent(items), [items]);

  if (loading) return null;
  if (!loggedIn) return <Navigate to="/login" replace />;

  const total = items.length;
  const intro =
    phase === 'ready' && total > 0
      ? `Khám phá ${total} chương nền tảng C++. Chọn một chương để đọc lý thuyết và hiểu từng khái niệm qua ví dụ.`
      : 'Khám phá các chương nền tảng C++. Chọn một chương để đọc lý thuyết và hiểu từng khái niệm qua ví dụ.';

  let body;
  if (phase === 'loading') {
    body = (
      <div className="cl-list" aria-busy="true" aria-live="polite">
        <ChapterCardSkeleton />
        <ChapterCardSkeleton />
        <ChapterCardSkeleton />
      </div>
    );
  } else if (phase === 'error') {
    body = (
      <div className="cl-note" role="alert">
        <p>Không tải được danh sách chương. Kiểm tra kết nối rồi thử lại.</p>
        <button type="button" className="cl-btn cl-btn--secondary" onClick={() => setAttempt((n) => n + 1)}>
          Thử lại
        </button>
      </div>
    );
  } else if (total === 0) {
    body = (
      <div className="cl-note">
        <p>Chưa có chương nào. Hãy nạp dữ liệu mẫu (database/seed.sql) rồi tải lại trang.</p>
      </div>
    );
  } else {
    body = (
      <ul className="cl-list">
        {items.map((c) => (
          <li key={c.chapter_id}>
            <ChapterCard
              number={c.number}
              title={c.title}
              description={c.description}
              status={c.status}
              locked={c.locked}
              to={`/lesson/${c.chapter_id}`}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <AppShell activeKey="learn">
      <div className="cl-heading">
        <p className="cl-eyebrow">HỌC LÝ THUYẾT / C++</p>
        <h1 className="cl-title">Danh sách chương</h1>
        <p className="cl-intro">{intro}</p>
      </div>

      {phase === 'ready' && current && (
        <section className="cl-continue" aria-label="Tiếp tục học">
          <div className="cl-continue-text">
            <p className="cl-continue-label">
              {current.status === 'in_progress' ? 'BẠN ĐANG HỌC' : 'BẮT ĐẦU TỪ'} · CHƯƠNG {current.number}
            </p>
            <p className="cl-continue-title">{cleanTitle(current.title)}</p>
          </div>
          <Link to={`/lesson/${current.chapter_id}`} className="cl-btn cl-btn--primary cl-btn--sm">
            {current.status === 'in_progress' ? 'Tiếp tục học' : 'Bắt đầu học'}
            <Icon name="arrow-right" size={17} />
          </Link>
        </section>
      )}

      <section className="cl-collection" aria-labelledby="cl-all">
        <div className="cl-collection-head">
          <h2 id="cl-all">Tất cả chương</h2>
          {phase === 'ready' && total > 0 ? <span>{total} chương</span> : null}
        </div>
        {body}
      </section>
    </AppShell>
  );
}
