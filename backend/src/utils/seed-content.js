const frontmatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
const questionPromptPatterns = [
  /^\*\*Câu\s+\d+\s*[:.]\*\*\s*(.*)$/i,
  /^\*\*([^*\n].*?\?)\*\*\s*$/,
]
const answerPatterns = [
  /^\*\*Đáp án đúng:\*\*\s*(.*?)\s*$/i,
  /^\*\*Đáp án:\s*([A-D])\.\*\*\s*(.*?)\s*$/i,
  /^\*\*Đáp án:\*\*\s*(.*?)\s*$/i,
]
const optionPattern = /^\s*(?:-\s*)?([A-D])\.\s+(.+)$/

function parseScalar(value) {
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed)
  return trimmed
}

function parseAnswer(line) {
  for (const pattern of answerPatterns) {
    const match = line.match(pattern)
    if (match) {
      return pattern === answerPatterns[1]
        ? { value: match[1], explanation: match[2] }
        : { value: match[1], explanation: '' }
    }
  }
  return null
}

function parsePrompt(line) {
  for (const pattern of questionPromptPatterns) {
    const match = line.match(pattern)
    if (match) return match[1].trim()
  }
  return null
}

function findOptions(lines, start, end) {
  const options = []
  let inCodeFence = false

  for (let index = start; index < end; index++) {
    if (/^\s*```/.test(lines[index])) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue
    const match = lines[index].match(optionPattern)
    if (match) options.push({ line: index, letter: match[1], text: match[2].trim() })
  }

  return options
}

function findPromptBeforeOptions(lines, start, optionStart) {
  let inCodeFence = false
  let candidate = -1

  for (let index = start; index < optionStart; index++) {
    if (/^\s*```/.test(lines[index])) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence || !lines[index].trim() || /^#{1,6}\s/.test(lines[index])) continue
    if (/^\*\*Đáp án|^\*\*Giải thích/i.test(lines[index])) continue
    candidate = index
  }

  if (candidate < 0) return -1
  while (candidate > start && lines[candidate - 1].trim() && !/^#{1,6}\s/.test(lines[candidate - 1])) {
    candidate--
  }
  return candidate
}

export function parseQuizMarkdown(markdown) {
  const { body } = parseFrontmatter(markdown)
  const lines = body.split(/\r?\n/)
  const questionHeaders = []

  lines.forEach((line, index) => {
    const match = line.match(/^\**###\s+(\d+)\.q(\d+)\s*\|\s*(easy|medium|hard)\s*\|\s*(multiple_choice|code)\s*\**\s*$/i)
    if (match) {
      questionHeaders.push({
        line: index,
        chapter_id: Number(match[1]),
        source_code: `${match[1]}.q${match[2]}`,
        difficulty: match[3].toLowerCase(),
        question_type: match[4].toLowerCase(),
      })
    }
  })

  return questionHeaders.map((header, index) => {
    const start = header.line + 1
    const end = questionHeaders[index + 1]?.line ?? lines.length
    const block = lines.slice(start, end)
    const promptLine = block.findIndex((line) => /^\*\*Câu hỏi:\*\*/i.test(line))
    const answerLine = block.findIndex((line) => parseAnswer(line))
    if (promptLine < 0 || answerLine < 0) {
      throw new Error(`Quiz ${header.source_code} is missing its question or answer`)
    }

    const options = findOptions(block, promptLine + 1, answerLine)
    const firstOptionLine = options[0]?.line ?? answerLine
    const prompt = block[promptLine].replace(/^\*\*Câu hỏi:\*\*\s*/i, '').trim()
    const content = [prompt, ...block.slice(promptLine + 1, firstOptionLine)]
      .join('\n')
      .trim()
    const answer = parseAnswer(block[answerLine])
    const correctOption = options.find(({ letter }) => (
      letter === answer.value.trim().replace(/[.)]$/, '')
    ))
    const explanationLine = block.slice(answerLine + 1).find((line) => /^\*\*Giải thích:\*\*/i.test(line))
    const explanation = [
      answer.explanation,
      explanationLine?.replace(/^\*\*Giải thích:\*\*\s*/i, '').trim(),
    ].filter(Boolean).join('\n').trim()

    return {
      chapter_id: header.chapter_id,
      source_code: header.source_code,
      content,
      question_type: header.question_type,
      options: options.length ? JSON.stringify(options.map(({ letter, text }) => `${letter}. ${text}`)) : null,
      correct_answer: correctOption
        ? `${correctOption.letter}. ${correctOption.text}`
        : answer.value.trim().replace(/^`(.*)`$/, '$1').replace(/[.]$/, ''),
      explanation: explanation || null,
      difficulty: header.difficulty,
    }
  })
}

export function parseFrontmatter(markdown) {
  const match = markdown.match(frontmatterPattern)
  if (!match) throw new Error('Markdown file is missing YAML frontmatter')

  const metadata = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z_]+):\s*(.*)$/)
    if (field) metadata[field[1]] = parseScalar(field[2])
  }

  return { metadata, body: markdown.slice(match[0].length) }
}

export function parseLessonMarkdown(markdown) {
  const { metadata, body } = parseFrontmatter(markdown)
  if (!metadata.chapter_id || !metadata.lesson_code || !metadata.title || !metadata.order_index) {
    throw new Error('Lesson Markdown is missing required frontmatter fields')
  }

  const lines = body.split(/\r?\n/)
  const promptLines = []
  const answerLines = []

  lines.forEach((line, index) => {
    if (parsePrompt(line) !== null) promptLines.push(index)
    if (parseAnswer(line)) answerLines.push(index)
  })

  const questions = []
  const removedRanges = []
  let lastAnswerLine = -1

  for (const answerLine of answerLines) {
    let promptLine = promptLines
      .filter((index) => index > lastAnswerLine && index < answerLine)
      .at(-1)

    const answer = parseAnswer(lines[answerLine])
    const options = findOptions(lines, lastAnswerLine + 1, answerLine)
    const optionStart = options[0]?.line ?? answerLine
    if (promptLine === undefined) {
      const inferredPromptLine = findPromptBeforeOptions(lines, lastAnswerLine + 1, optionStart)
      if (inferredPromptLine < 0) {
        lastAnswerLine = answerLine
        continue
      }
      promptLine = inferredPromptLine
    }

    const nextPromptLine = promptLines.find((index) => index > answerLine)
    const nextHeadingLine = lines.findIndex((line, index) => index > answerLine && /^#{1,6}\s/.test(line))
    const endLine = [nextPromptLine, nextHeadingLine, lines.length]
      .filter((index) => index !== undefined && index >= 0)
      .reduce((smallest, index) => Math.min(smallest, index), lines.length)
    const promptText = parsePrompt(lines[promptLine]) ?? lines[promptLine].trim()
    const content = [promptText, ...lines.slice(promptLine + 1, optionStart)]
      .join('\n')
      .trim()
    const correctOption = options.find(({ letter }) => letter === answer.value.trim().replace(/[.)]$/, ''))
    const answerLineExplanation = lines[answerLine].match(/^\*\*Đáp án:\s*[A-D]\.\*\*\s*(.*)$/i)?.[1]?.trim()
    const explanationStart = lines.findIndex((line, index) => (
      index > answerLine && index < endLine && /^\*\*Giải thích:\*\*/i.test(line)
    ))
    const explanation = [
      answerLineExplanation || answer.explanation,
      ...(explanationStart >= 0
        ? [
            lines[explanationStart].replace(/^\*\*Giải thích:\*\*\s*/i, ''),
            ...lines.slice(explanationStart + 1, endLine),
          ]
        : []),
    ].filter(Boolean).join('\n').trim()

    if (content) {
      questions.push({
        chapter_id: metadata.chapter_id,
        lesson_code: String(metadata.lesson_code),
        question_index: questions.length + 1,
        content,
        question_type: options.length ? 'multiple_choice' : 'short_answer',
        options: options.length ? JSON.stringify(options.map(({ letter, text }) => `${letter}. ${text}`)) : null,
        correct_answer: correctOption
          ? `${correctOption.letter}. ${correctOption.text}`
          : answer.value.trim().replace(/^`(.*)`$/, '$1').replace(/[.]$/, ''),
        explanation: explanation || null,
      })
      removedRanges.push([promptLine, endLine])
    }
    lastAnswerLine = answerLine
  }

  const contentLines = lines.filter((_, index) => {
    if (/^#{2,3}\s+(?:\d+\.\s*)?Câu hỏi\b/i.test(lines[index])) return false
    return !removedRanges.some(([start, end]) => index >= start && index < end)
  })

  return {
    chapter_id: metadata.chapter_id,
    lesson_code: String(metadata.lesson_code),
    title: String(metadata.title),
    description: String(metadata.description ?? ''),
    order_index: metadata.order_index,
    content: contentLines.join('\n').trim(),
    questions,
  }
}
