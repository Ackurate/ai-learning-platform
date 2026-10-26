import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './HomeIcons';
import { initials } from '../utils/chapters';
import '../styles/app-shell.css';

/*
 * Khung chung cho các trang sau đăng nhập (theo Figma: Sidebar + Header).
 *   Desktop (>=1120): sidebar mở rộng 248px
 *   Tablet (640–1119): sidebar thu gọn 88px
 *   Mobile (<640): không có sidebar, nút menu mở ngăn kéo bên trái
 *
 * Dùng: <AppShell activeKey="learn">…nội dung trang…</AppShell>
 */

const LEARN_ITEMS = [
  { key: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard', to: '/dashboard' },
  { key: 'learn', icon: 'book-open', label: 'Học C++', to: '/chapters' },
  // Tạm: chưa có trang riêng, trỏ về danh sách chương (chọn chương → làm trắc nghiệm / hỏi AI).
  { key: 'quiz', icon: 'square-terminal', label: 'Trắc nghiệm', to: '/chapters' },
];

function NavItem({ item, active, onClick }) {
  const className = `as-item${active ? ' is-active' : ''}`;
  const content = (
    <>
      <Icon name={item.icon} size={20} />
      <span>{item.label}</span>
    </>
  );
  return item.to ? (
    <Link to={item.to} className={className} aria-current={active ? 'page' : undefined} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}

function Brand({ className = '' }) {
  return (
    <Link to="/" className={`as-brand ${className}`} aria-label="BYTE//CPP — trang chủ">
      <span className="as-brand-mark">{'</>'}</span>
      <span className="as-brand-id">
        <span className="as-brand-name">
          BYTE<span>//</span>CPP
        </span>
        <span className="as-brand-sub">C++ Learning</span>
      </span>
    </Link>
  );
}

export default function AppShell({
  children,
  activeKey = 'learn',
  title = 'Học C++',
  subtitle = 'Kiến thức lý thuyết C++',
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const displayName = user?.username || user?.email || 'Tài khoản';
  const closeNav = () => setNavOpen(false);

  // Esc đóng ngăn kéo menu (mobile)
  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setNavOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const handleLogout = () => {
    closeNav();
    if (typeof logout === 'function') {
      logout();
    } else {
      console.warn('AppShell: AuthContext không có hàm logout() — cần sửa tên hàm trong AppShell.jsx.');
    }
    navigate('/', { replace: true });
  };

  return (
    <div className={`app-shell${navOpen ? ' is-nav-open' : ''}`}>
      <a className="as-skip" href="#main-content">
        Bỏ qua điều hướng
      </a>

      <aside className="as-sidebar" id="as-sidebar" aria-label="Điều hướng chính">
        <Brand className="as-sidebar-brand" />

        <nav className="as-group" aria-label="Học tập">
          <p className="as-group-label">HỌC TẬP</p>
          {LEARN_ITEMS.map((item) => (
            <NavItem key={item.key} item={item} active={item.key === activeKey} onClick={closeNav} />
          ))}
        </nav>

        <hr className="as-divider" />

        <nav className="as-group" aria-label="Tài khoản">
          <p className="as-group-label">TÀI KHOẢN</p>
          {/* Tạm: chưa có trang Cài đặt */}
          <NavItem item={{ icon: 'settings', label: 'Cài đặt' }} onClick={closeNav} />
          <NavItem item={{ icon: 'log-out', label: 'Đăng xuất' }} onClick={handleLogout} />
        </nav>
      </aside>

      {navOpen && <div className="as-scrim" onClick={closeNav} aria-hidden="true" />}

      <div className="as-main">
        <header className="as-header">
          {/* Desktop: tiêu đề khu vực (thương hiệu đã nằm ở sidebar) */}
          <div className="as-head-title">
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
          {/* Tablet + mobile: thương hiệu */}
          <Brand className="as-head-brand" />

          <div className="as-account">
            <span className="as-avatar" aria-hidden="true">
              {initials(displayName)}
            </span>
            <span className="as-account-name">{displayName}</span>
            <Icon name="chevron-down" size={16} />
          </div>

          <button
            type="button"
            className="as-burger"
            aria-label={navOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={navOpen}
            aria-controls="as-sidebar"
            onClick={() => setNavOpen((v) => !v)}
          >
            <Icon name={navOpen ? 'x' : 'menu'} size={20} />
          </button>
        </header>

        <main id="main-content" className="as-content">
          <div className="as-content-inner">
            {children}
            <footer className="as-signoff">
              <span>© 2026 C++ Learning</span>
              <span className="as-signoff-code">{'< learn. understand. repeat. />'}</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
