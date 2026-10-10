import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero">
      <h1>Học lập trình cơ bản cùng AI</h1>
      <p className="muted">
        Học theo từng chương, làm quiz, xem trực quan hóa thuật toán và hỏi AI bất cứ lúc nào.
      </p>
      <Link to="/chapters" className="button">Bắt đầu học</Link>
    </section>
  )
}
