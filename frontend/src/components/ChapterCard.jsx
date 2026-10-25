import { Link } from 'react-router-dom';
import Icon from './HomeIcons';
import { cleanTitle } from '../utils/chapters';

/*
 * Thành phần dùng chung theo Figma "Component dùng chung":
 *   StatusBadge — Đã hoàn thành / Đang học / Chưa học (luôn có chữ + icon, không chỉ dựa vào màu)
 *   ChapterCard — 1 thẻ chương, 4 trạng thái hiển thị:
 *     completed   → "Ôn lại"
 *     in_progress → "Tiếp tục học" (nút chính, thẻ viền tím)
 *     not_started → "Xem chương"
 *     locked      → "Khóa" (không bấm được)
 */

const BADGES = {
  completed: { icon: 'circle-check', label: 'Đã hoàn thành', tone: 'is-done' },
  in_progress: { icon: 'book-open', label: 'Đang học', tone: 'is-doing' },
  not_started: { icon: 'circle', label: 'Chưa học', tone: 'is-todo' },
};

export function StatusBadge({ status }) {
  const badge = BADGES[status] || BADGES.not_started;
  return (
    <span className={`cc-badge ${badge.tone}`}>
      <Icon name={badge.icon} size={14} />
      {badge.label}
    </span>
  );
}

function Action({ status, locked, to }) {
  if (locked) {
    return (
      <span className="cl-btn cl-btn--locked cc-action" title="Hoàn thành chương trước để mở khóa">
        <Icon name="lock" size={16} />
        Khóa
        <span className="sr-only"> — hoàn thành chương trước để mở khóa</span>
      </span>
    );
  }
  if (status === 'in_progress') {
    return (
      <Link to={to} className="cl-btn cl-btn--primary cc-action">
        Tiếp tục học
        <Icon name="arrow-right" size={17} />
      </Link>
    );
  }
  return (
    <Link to={to} className="cl-btn cl-btn--secondary cc-action">
      {status === 'completed' ? 'Ôn lại' : 'Xem chương'}
    </Link>
  );
}

export default function ChapterCard({ number, title, description, status = 'not_started', locked = false, to }) {
  const current = status === 'in_progress';
  const index = String(number).padStart(2, '0');

  return (
    <article className={`cc${current ? ' is-current' : ''}${locked ? ' is-locked' : ''}`}>
      <span className="cc-index" aria-hidden="true">
        {index}
      </span>

      <div className="cc-summary">
        <h3 className="cc-title">
          Chương {number}: {cleanTitle(title)}
        </h3>
        {description ? <p className="cc-desc">{description}</p> : null}
      </div>

      <div className="cc-controls">
        <StatusBadge status={status} />
        <Action status={status} locked={locked} to={to} />
      </div>
    </article>
  );
}

/** Khung chờ khi đang tải. */
export function ChapterCardSkeleton() {
  return (
    <div className="cc cc-skeleton" aria-hidden="true">
      <span className="cc-index" />
      <div className="cc-summary">
        <span className="sk-line sk-line--title" />
        <span className="sk-line" />
      </div>
      <div className="cc-controls">
        <span className="sk-pill" />
        <span className="sk-btn" />
      </div>
    </div>
  );
}
