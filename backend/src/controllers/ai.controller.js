import { pool } from '../config/db.js'
import { askLLM } from '../services/llm.service.js'

export function buildAiContext({ chapterTitle, chapterDescription, questionContent, questionExplanation } = {}) {
  if (questionContent) {
    const lines = [`Câu quiz: ${questionContent}`]
    if (questionExplanation) lines.push(`Giải thích: ${questionExplanation}`)
    return lines.join('\n')
  }

  if (chapterTitle) {
    return `Chương đang học: ${chapterTitle}${chapterDescription ? `. ${chapterDescription}` : ''}`
  }

  return ''
}

// Hỏi AI. Có thể gắn kèm questionId (đang làm câu nào) hoặc chapterId (đang học chương nào)
export async function ask(req, res, next) {
  try {
    const { question, chapterId, questionId } = req.body
    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập câu hỏi' })
    }

    let context = ''
    if (questionId) {
      const [rows] = await pool.execute(
        'SELECT content, explanation FROM questions WHERE question_id = ?',
        [questionId],
      )
      if (rows[0]) {
        context = buildAiContext({
          questionContent: rows[0].content,
          questionExplanation: rows[0].explanation ?? '',
        })
      }
    } else if (chapterId) {
      const [rows] = await pool.execute(
        'SELECT title, description FROM chapters WHERE chapter_id = ?',
        [chapterId],
      )
      if (rows[0]) {
        context = buildAiContext({
          chapterTitle: rows[0].title,
          chapterDescription: rows[0].description ?? '',
        })
      }
    }

    const answer = await askLLM({ question: question.trim().slice(0, 1000), context })
    res.json({ answer })
  } catch (err) {
    next(err)
  }
}
