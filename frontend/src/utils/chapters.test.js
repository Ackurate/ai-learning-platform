import assert from 'node:assert/strict'
import test from 'node:test'
import { buildChapterItems } from './chapters.js'

test('chapter quiz remains locked unless progress reports every lesson completed', () => {
  const chapters = [{ chapter_id: 1, order_index: 1 }, { chapter_id: 2, order_index: 2 }]
  const progress = [
    { chapter_id: 1, status: 'in_progress', total_lessons: 3, completed_lessons: 2 },
    { chapter_id: 2, status: 'completed', total_lessons: 2, completed_lessons: 2 },
  ]

  const items = buildChapterItems(chapters, progress)

  assert.equal(items[0].quizUnlocked, false)
  assert.equal(items[1].quizUnlocked, true)
})

test('chapter quiz stays locked when the chapter contains no lessons', () => {
  const [chapter] = buildChapterItems(
    [{ chapter_id: 1, order_index: 1 }],
    [{ chapter_id: 1, status: 'in_progress', total_lessons: 0, completed_lessons: 0 }],
  )

  assert.equal(chapter.quizUnlocked, false)
})


test('buildChapterItems unlocks all chapters and quizzes when isUnlocked is true', () => {
  const chapters = [{ chapter_id: 1, order_index: 1 }, { chapter_id: 2, order_index: 2 }]
  const progress = [
    { chapter_id: 1, status: 'not_started', total_lessons: 3, completed_lessons: 0 },
    { chapter_id: 2, status: 'not_started', total_lessons: 2, completed_lessons: 0 },
  ]

  const items = buildChapterItems(chapters, progress, true)

  assert.equal(items[0].locked, false)
  assert.equal(items[0].quizUnlocked, true)
  assert.equal(items[1].locked, false)
  assert.equal(items[1].quizUnlocked, true)
})
