import { useState } from 'react'

// Icon "eye" / "eye-off" (bộ Lucide, giấy phép ISC). Nhúng trực tiếp để không phụ thuộc file ảnh.
function EyeIcon({ off = false }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {off ? (
        <>
          <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
          <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
          <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
          <path d="m2 2 20 20" />
        </>
      ) : (
        <>
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  )
}

export function TextField({ id, label, error, ...inputProps }) {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>{label}</label>
      <div className={`auth-input${error ? ' has-error' : ''}`}>
        <input id={id} aria-invalid={Boolean(error)} {...inputProps} />
      </div>
      {error && <p className="auth-error">{error}</p>}
    </div>
  )
}

export function PasswordField({ id, label, hint, error, ...inputProps }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>{label}</label>
      <div className={`auth-input auth-input--password${error ? ' has-error' : ''}`}>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          {...inputProps}
        />
        <button
          type="button"
          className="auth-eye"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          aria-pressed={visible}
        >
          <EyeIcon off={visible} />
        </button>
      </div>
      {error ? <p className="auth-error">{error}</p> : hint ? <p className="auth-hint">{hint}</p> : null}
    </div>
  )
}
