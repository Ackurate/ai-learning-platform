import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

// Khối code minh họa ở cột trái (chỉ hiện trên màn hình rộng)
const CODE_LINES = [
  [['kw', '#include'], ' <iostream>'],
  [['kw', 'using namespace'], ' std;'],
  [],
  [['kw', 'int'], ' main() {'],
  [' cout << ', ['str', '"Hello, World!"'], ';'],
  [' ', ['kw', 'return'], ' 0;'],
  ['}'],
]

function CodeBlock() {
  return (
    <figure className="code-block">
      <div className="code-toolbar">
        <span className="code-file">
          <img src="/icons/file-code-2.svg" alt="" width="17" height="17" />
          main.cpp
        </span>
        <span className="code-lang">C++17</span>
      </div>
      <div className="code-source">
        {CODE_LINES.map((parts, i) => (
          <div className="code-line" key={i}>
            <span className="code-num">{i + 1}</span>
            <span className="code-text">
              {parts.map((part, j) =>
                typeof part === 'string'
                  ? part
                  : <span key={j} className={`code-${part[0]}`}>{part[1]}</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="code-output">
        <span className="code-output-head">
          <img src="/icons/terminal.svg" alt="" width="14" height="14" />
          Kết quả
        </span>
        <p className="code-output-text">Hello, World!</p>
      </div>
    </figure>
  )
}

/**
 * Khung dùng chung cho trang Đăng ký và Đăng nhập:
 * thanh điều hướng, thẻ (cột trái trên desktop + form), chân trang.
 *
 * asideTitle: mảng các dòng tiêu đề ở cột trái, ví dụ ['Dòng 1.', 'Dòng 2.']
 * asideText:  đoạn mô tả ngắn ở cột trái
 * children:   thẻ <form className="auth-form">
 */
export default function AuthLayout({ asideTitle, asideText, children }) {
  return (
    <div className="auth-page">
      <header className="auth-nav">
        <Link to="/" className="auth-brand" aria-label="BYTE//CPP - Trang chủ">
          <span className="auth-brand-mark" aria-hidden="true">{'</>'}</span>
          <span className="auth-brand-identity">
            <span className="auth-brand-name">BYTE<span>//</span>CPP</span>
            <span className="auth-brand-tag">C++ Learning</span>
          </span>
        </Link>
        <Link to="/" className="auth-nav-link">
          <span className="auth-nav-full">← Về trang chủ</span>
          <span className="auth-nav-short">Trang chủ</span>
        </Link>
      </header>

      <main className="auth-content">
        <div className="auth-card">
          <aside className="auth-aside" aria-hidden="true">
            <div className="auth-aside-intro">
              <p className="auth-eyebrow auth-eyebrow--regular">TỪNG BƯỚC NHỎ / C++</p>
              <h2 className="auth-aside-title">
                {asideTitle.map((line, i) => (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </h2>
              <p className="auth-aside-text">{asideText}</p>
            </div>

            <CodeBlock />

            <p className="auth-aside-tagline">{'< learn. build. repeat. />'}</p>
          </aside>

          {children}
        </div>
      </main>

      <footer className="auth-footer">© 2026 C++ Learning</footer>
    </div>
  )
}
