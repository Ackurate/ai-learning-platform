// Logic thuần (không phụ thuộc React) cho trang Danh sách chương.

// true  → chương chưa học sẽ bị "Khóa" cho tới khi hoàn thành chương trước (đúng như Figma).
// false → mở tất cả chương, không còn nút "Khóa".
// Lưu ý: đây chỉ là khóa ở giao diện; backend chưa chặn truy cập trực tiếp /lesson/:id.
export const LOCK_SEQUENTIAL = true;

/** Bỏ tiền tố "Chương N:" nếu tiêu đề trong DB đã có, để tự ghép lại cho thống nhất. */
export function cleanTitle(title = '') {
  return String(title).replace(/^\s*Chương\s*\d+\s*[:.\-–—]\s*/i, '').trim();
}

/** Chấp nhận cả mảng thuần lẫn { chapters: [...] } / { progress: [...] } / { data: [...] }. */
export function toList(res, key) {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  const inner = d?.[key] ?? d?.data;
  return Array.isArray(inner) ? inner : [];
}

/**
 * Ghép danh sách chương với tiến độ của người dùng.
 * Trả về mảng { ...chapter, number, status, locked } theo thứ tự order_index.
 */
export function buildChapterItems(chapters = [], progress = []) {
  const statusById = new Map(progress.map((p) => [p.chapter_id, p.status]));
  const sorted = [...chapters].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

  let previousDone = true; // chương đầu luôn mở
  return sorted.map((chapter, i) => {
    const status = statusById.get(chapter.chapter_id) ?? 'not_started';
    const locked = LOCK_SEQUENTIAL && status === 'not_started' && !previousDone;
    previousDone = status === 'completed';
    return { ...chapter, number: i + 1, status, locked };
  });
}

/** Chương hiển thị ở khối "Bạn đang học": đang học dở, hoặc chương mở đầu tiên chưa hoàn thành. */
export function pickCurrent(items) {
  return (
    items.find((c) => c.status === 'in_progress') ||
    items.find((c) => c.status !== 'completed' && !c.locked) ||
    null
  );
}

/** "Nguyễn Văn A" → "NA"; "an" → "AN". */
export function initials(name = '') {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
