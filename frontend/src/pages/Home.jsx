import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/HomeIcons';
import '../styles/home.css';

/* ------------------------------ Dữ liệu tĩnh ------------------------------ */

// Mỗi dòng code: mảng [kiểu, chữ]. kiểu: 'kw' (từ khóa), 'str' (chuỗi), '' (thường)
const CODE_LINES = [
  [['kw', '#include'], ['', ' <iostream>']],
  [['kw', 'using namespace'], ['', ' std;']],
  [],
  [['kw', 'int'], ['', ' main() {']],
  [['', '    cout << '], ['str', '"Hello, World!"'], ['', ';']],
  [['', '    '], ['kw', 'return'], ['', ' 0;']],
  [['', '}']],
];

const TOPICS = [
  { icon: 'code-2', title: 'C++ cơ bản', text: 'Cú pháp, cấu trúc chương trình. Hiểu những thành phần của một chương trình C++.' },
  { icon: 'braces', title: 'Biến & kiểu dữ liệu', text: 'int, float, char, string. Lưu trữ và sử dụng dữ liệu trong chương trình.' },
  { icon: 'git-branch', title: 'Điều kiện', text: 'if, else, switch. Đưa ra quyết định dựa trên điều kiện.' },
  { icon: 'repeat-2', title: 'Vòng lặp', text: 'for, while, do while. Lặp lại công việc mà không cần viết lại code.' },
  { icon: 'blocks', title: 'Hàm & Mảng', text: 'Function, Array, String. Chia nhỏ bài toán và xử lý tập hợp dữ liệu.' },
  { icon: 'box', title: 'OOP cơ bản', text: 'Class, Object, Constructor. Làm quen với lập trình hướng đối tượng.' },
];

const STAGES = [
  {
    range: '01 — 03',
    title: 'Nền tảng',
    arrow: true,
    steps: [
      { n: '01', title: 'Làm quen với C++', hint: 'Bắt đầu từ đây', active: true },
      { n: '02', title: 'Biến & kiểu dữ liệu' },
      { n: '03', title: 'Input / Output' },
    ],
  },
  {
    range: '04 — 06',
    title: 'Tư duy lập trình',
    arrow: true,
    steps: [
      { n: '04', title: 'Câu lệnh điều kiện' },
      { n: '05', title: 'Vòng lặp' },
      { n: '06', title: 'Hàm' },
    ],
  },
  {
    range: '07 — 09',
    title: 'Tổ chức chương trình',
    steps: [
      { n: '07', title: 'Mảng & String' },
      { n: '08', title: 'OOP cơ bản' },
      { n: '09', title: 'Trắc nghiệm tổng hợp' },
    ],
  },
];

const METHOD = [
  { n: '01', title: 'Học lý thuyết', text: 'Nắm vững khái niệm, cấu trúc và quy tắc của C++.' },
  { n: '02', title: 'Xem ví dụ', text: 'Đọc hiểu code mẫu để hiểu rõ hơn cách áp dụng khái niệm.' },
  { n: '03', title: 'Làm bài trắc nghiệm', text: 'Kiểm tra sự hiểu biết của bạn qua các câu hỏi lý thuyết.' },
  { n: '04', title: 'Hỏi AI', text: 'Hỏi AI về những khái niệm chưa rõ để hiểu sâu hơn.' },
];

const LESSONS = [
  { icon: 'code-2', title: 'C++ là gì?', minutes: 10, cta: 'Bắt đầu' },
  { icon: 'braces', title: 'Biến trong C++', minutes: 15, cta: 'Học ngay' },
  { icon: 'arrow-right-left', title: 'Input / Output', minutes: 15, cta: 'Học ngay' },
];

const NAV_LINKS = [
  { label: 'Học C++', to: '/chapters' },
  { label: 'Lộ trình', href: '#lo-trinh' },
  { label: 'Trắc nghiệm', to: '/chapters' },
  { label: 'AI Tutor', href: '#ai-tutor' },
];

/* ------------------------------ Thành phần nhỏ ------------------------------ */

function NavItem({ item, className, onClick }) {
  return item.to ? (
    <Link to={item.to} className={className} onClick={onClick}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

function Brand() {
  return (
    <Link to="/" className="hp-brand" aria-label="BYTE//CPP — trang chủ">
      <span className="hp-brand-mark">{'</>'}</span>
      <span className="hp-brand-id">
        <span className="hp-brand-name">
          BYTE<span>//</span>CPP
        </span>
        <span className="hp-brand-sub">C++ Learning</span>
      </span>
    </Link>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="hp-intro">
      <p className="hp-eyebrow">{eyebrow}</p>
      <h2 className="hp-h2">{title}</h2>
      <p className="hp-lead-sm">{text}</p>
    </div>
  );
}

/* ---------------------------------- Trang ---------------------------------- */

export default function Home() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Yêu cầu: đã đăng nhập → trang chọn chương; chưa đăng nhập → đăng ký.
  const startTo = user ? '/chapters' : '/register';
  const closeMenu = () => setMenuOpen(false);

  const StartButton = ({ className = '', children = 'Bắt đầu học' }) => (
    <Link to={startTo} className={`hp-btn hp-btn--primary ${className}`}>
      {children}
      <Icon name="arrow-right" size={17} />
    </Link>
  );

  return (
    <div className="home-page" id="top">
      {/* ------------------------------ Navbar ------------------------------ */}
      <header className="hp-nav">
        <div className="hp-nav-bar">
          <Brand />

          <nav className="hp-nav-links" aria-label="Điều hướng chính">
            {NAV_LINKS.map((item) => (
              <NavItem key={item.label} item={item} className="hp-nav-link" />
            ))}
          </nav>

          <div className="hp-nav-actions">
            {user ? (
              <Link to="/dashboard" className="hp-nav-login">
                Tiến độ
              </Link>
            ) : (
              <Link to="/login" className="hp-nav-login">
                Đăng nhập
              </Link>
            )}
            <Link to={startTo} className="hp-btn hp-btn--primary hp-btn--sm hp-nav-start">
              Bắt đầu học
              <Icon name="arrow-right" size={17} />
            </Link>
            <button
              type="button"
              className="hp-menu-btn"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="hp-menu" aria-label="Menu di động">
            {NAV_LINKS.map((item) => (
              <NavItem key={item.label} item={item} className="hp-menu-link" onClick={closeMenu} />
            ))}
            <Link to={startTo} className="hp-btn hp-btn--primary hp-menu-start" onClick={closeMenu}>
              Bắt đầu học
              <Icon name="arrow-right" size={17} />
            </Link>
          </nav>
        )}
      </header>

      <main>
        {/* ------------------------------- Hero ------------------------------- */}
        <section className="hp-section hp-hero">
          <div className="hp-hero-intro">
            <span className="hp-badge">
              <Icon name="sprout" size={15} />
              Dành cho người mới bắt đầu
            </span>
            <h1 className="hp-h1">
              Học lý thuyết <span>C++</span> từ con số 0
            </h1>
            <p className="hp-lead">
              Học lý thuyết C++ theo từng bước, từ những khái niệm đầu tiên đến khả năng đọc hiểu và nắm vững nền
              tảng.
            </p>
            <div className="hp-hero-actions">
              <StartButton />
              <a href="#lo-trinh" className="hp-btn hp-btn--secondary">
                Xem lộ trình
              </a>
            </div>
            <p className="hp-reassure">
              <Icon name="circle-check" size={16} />
              Không cần kiến thức lập trình trước đó.
            </p>
          </div>

          <figure className="hp-preview">
            <figcaption className="hp-preview-caption">
              <span>VÍ DỤ MÃ C++ ĐẦU TIÊN</span>
              <span>01 /</span>
            </figcaption>
            <div className="hp-code">
              <div className="hp-code-bar">
                <span className="hp-code-file">
                  <Icon name="file-code-2" size={17} />
                  main.cpp
                </span>
                <span className="hp-code-lang">C++17</span>
              </div>
              <pre className="hp-code-body" aria-label="Chương trình Hello World bằng C++">
                {CODE_LINES.map((line, i) => (
                  <span className="hp-code-line" key={i}>
                    <span className="hp-code-no">{i + 1}</span>
                    <span className="hp-code-text">
                      {line.length === 0
                        ? '​'
                        : line.map(([kind, text], j) => (
                            <span key={j} className={kind ? `tok-${kind}` : undefined}>
                              {text}
                            </span>
                          ))}
                    </span>
                  </span>
                ))}
              </pre>
              <div className="hp-code-out">
                <span className="hp-code-out-head">
                  <Icon name="terminal" size={14} />
                  Kết quả
                </span>
                <span className="hp-code-out-text">Hello, World!</span>
              </div>
            </div>
            <p className="hp-preview-note">
              Một ví dụ C++ cơ bản để bạn làm quen với cấu trúc chương trình và cách đọc code.
            </p>
          </figure>
        </section>

        {/* ------------------------- Bạn sẽ học được gì ------------------------- */}
        <section className="hp-section hp-topics" id="noi-dung">
          <SectionIntro
            eyebrow="01 / Kiến thức nền tảng"
            title="Bạn sẽ học được gì?"
            text="Nắm vững nền tảng, từng khái niệm một. Mỗi chủ đề đều có lý thuyết, ví dụ và trắc nghiệm để bạn tự kiểm tra hiểu biết."
          />
          <div className="hp-topic-grid">
            {TOPICS.map((t) => (
              <article className="hp-card hp-topic" key={t.title}>
                <span className="hp-icon-box">
                  <Icon name={t.icon} size={20} />
                </span>
                <div className="hp-topic-info">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------- Lộ trình học ---------------------------- */}
        <section className="hp-section hp-soft hp-roadmap" id="lo-trinh">
          <SectionIntro
            eyebrow="02 / Từng bước tiến bộ"
            title="Lộ trình học C++"
            text="Không biết bắt đầu từ đâu? Đi theo 9 bước dưới đây, từ chương trình đầu tiên đến trắc nghiệm tổng hợp."
          />
          <div className="rm-stages">
            {STAGES.map((stage, si) => (
              <div className="rm-stage" key={stage.title}>
                <div className="rm-stage-head">
                  <div className="rm-stage-label">
                    <span className="rm-range">{stage.range}</span>
                    <span className="rm-stage-title">{stage.title}</span>
                  </div>
                  {stage.arrow && <Icon name="arrow-right" size={18} className="rm-stage-arrow" />}
                </div>
                <div className="rm-steps">
                  {stage.steps.map((step, i) => {
                    const stageLast = i === stage.steps.length - 1;
                    const last = stageLast && si === STAGES.length - 1;
                    return (
                      <div
                        key={step.n}
                        className={`rm-entry${stageLast ? ' is-stage-last' : ''}${last ? ' is-last' : ''}`}
                      >
                        <div className={`rm-item${step.active ? ' is-active' : ''}`}>
                          <span className="rm-num">{step.n}</span>
                          <span className="rm-info">
                            <span className="rm-title">{step.title}</span>
                            {step.hint && <span className="rm-hint">{step.hint}</span>}
                          </span>
                        </div>
                        <div className="rm-conn" aria-hidden="true">
                          <span />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="hp-center">
            <Link to="/chapters" className="hp-btn hp-btn--secondary hp-btn--wide">
              Xem toàn bộ lộ trình
              <Icon name="arrow-right" size={17} />
            </Link>
          </div>
        </section>

        {/* ------------------------------ Cách học ------------------------------ */}
        <section className="hp-section hp-method">
          <SectionIntro
            eyebrow="03 / Học để hiểu sâu"
            title="Học như thế nào?"
            text="Hiểu trước, kiểm tra sau. Một quy trình đơn giản để kiến thức lý thuyết thật sự trở thành nền tảng vững chắc."
          />
          <ol className="mt-steps">
            {METHOD.map((m, i) => (
              <li className={`mt-step${i === METHOD.length - 1 ? ' is-last' : ''}`} key={m.n}>
                <div className="mt-head">
                  <span className="mt-num">{m.n}</span>
                  <span className="mt-line" aria-hidden="true" />
                </div>
                <div className="mt-text">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="hp-loop">
            <Icon name="route" size={20} />
            <p>Học lý thuyết → Xem ví dụ → Làm bài trắc nghiệm → Hỏi AI</p>
          </div>
        </section>

        {/* -------------------------- Bài học đề xuất -------------------------- */}
        <section className="hp-section hp-soft hp-lessons">
          <SectionIntro
            eyebrow="04 / Bắt đầu ngay hôm nay"
            title="Bài học lý thuyết đề xuất"
            text="Bắt đầu với những bài học ngắn, dễ hiểu. Chọn bài đầu tiên và làm quen với lý thuyết C++."
          />
          <div className="hp-lesson-grid">
            {LESSONS.map((l) => (
              <article className="hp-card hp-lesson" key={l.title}>
                <div className="hp-lesson-meta">
                  <span className="hp-icon-box">
                    <Icon name={l.icon} size={20} />
                  </span>
                  <span className="hp-tag">Beginner</span>
                </div>
                <h3>{l.title}</h3>
                <div className="hp-lesson-action">
                  <span className="hp-duration">
                    <Icon name="clock" size={15} />
                    {l.minutes} phút
                  </span>
                  <Link to={startTo} className="hp-lesson-cta">
                    {l.cta}
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------ AI Tutor ------------------------------ */}
        <section className="hp-section hp-ai" id="ai-tutor">
          <div className="hp-tutor">
            <div className="hp-tutor-intro">
              <p className="hp-eyebrow">AI / Trợ lý học tập</p>
              <h2 className="hp-h2 hp-h2--tutor">Gặp khó khi học? Hãy hỏi AI Tutor</h2>
              <p className="hp-tutor-text">
                AI Tutor có thể giải thích lại khái niệm, chỉ ra chỗ chưa rõ trong ví dụ và đưa ra gợi ý để giúp bạn
                hiểu sâu hơn.
              </p>
              <Link to={startTo} className="hp-btn hp-btn--secondary">
                Hỏi AI
                <Icon name="arrow-right" size={17} />
              </Link>
              <p className="hp-tutor-note">Gợi ý để bạn tự hiểu, không làm bài thay bạn.</p>
            </div>

            <div className="hp-chat" aria-label="Ví dụ hội thoại với AI Tutor">
              <div className="hp-chat-id">
                <Icon name="sparkles" size={16} />
                <strong>AI Tutor</strong>
                <span>· Ví dụ hội thoại</span>
              </div>
              <div className="hp-msg hp-msg--user">
                <span className="hp-msg-who">Bạn</span>
                <p>Tôi chưa hiểu rõ về scope của biến trong C++.</p>
              </div>
              <div className="hp-msg hp-msg--ai">
                <span className="hp-msg-who">AI Tutor</span>
                <p>Hãy xem lại ví dụ về biến toàn cục và biến cục bộ để hiểu rõ hơn về phạm vi hoạt động của chúng.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ Lời mời ------------------------------ */}
        <section className="hp-callout">
          <div className="hp-callout-text">
            <h2>Bắt đầu từ chương trình đầu tiên.</h2>
            <p>Từng bước nhỏ hôm nay, nền tảng vững chắc ngày mai.</p>
          </div>
          <StartButton className="hp-callout-btn" />
        </section>
      </main>

      {/* ------------------------------- Footer ------------------------------- */}
      <footer className="hp-footer">
        <div className="hp-footer-top">
          <div className="hp-footer-id">
            <Brand />
            <p>Website học lý thuyết C++ cơ bản.</p>
          </div>
          <nav className="hp-footer-links" aria-label="Liên kết chân trang">
            {NAV_LINKS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
            {/* Tạm: chưa có trang "Về chúng tôi" */}
            <a href="#top">Về chúng tôi</a>
          </nav>
        </div>
        <hr className="hp-divider" />
        <div className="hp-footer-legal">
          <span>© 2026 C++ Learning</span>
          <span className="hp-footer-code">{'< learn. understand. repeat. />'}</span>
        </div>
      </footer>
    </div>
  );
}
