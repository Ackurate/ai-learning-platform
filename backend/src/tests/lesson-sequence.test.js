import assert from 'node:assert/strict'
import test from 'node:test'
import {
  areAllLessonsCompleted,
  canAccessLesson,
  findLessonIndex,
  getFirstIncompleteLesson,
} from '../utils/lesson-sequence.js'

const lessons = [
  { lesson_id: 11, lesson_code: '1.1', status: 'completed' },
  { lesson_id: 12, lesson_code: '1.2', status: 'not_started' },
  { lesson_id: 13, lesson_code: '1.3', status: 'completed' },
]

test('allows the first lesson and blocks a later lesson with an incomplete prerequisite', () => {
  assert.equal(canAccessLesson(lessons, 11), true)
  assert.equal(canAccessLesson(lessons, 12), true)
  assert.equal(canAccessLesson(lessons, 13), false)
})

test('allows a saved later completion only after its earlier lessons are complete', () => {
  assert.equal(canAccessLesson(lessons, 13), false)
  assert.equal(canAccessLesson(lessons.map((lesson) => ({ ...lesson, status: 'completed' })), 13), true)
})

test('finds the first incomplete lesson using the supplied lesson order', () => {
  assert.equal(getFirstIncompleteLesson(lessons).lesson_code, '1.2')
  assert.equal(getFirstIncompleteLesson(lessons.map((lesson) => ({ ...lesson, status: 'completed' }))), null)
})

test('only unlocks a chapter quiz when a non-empty lesson list is fully completed', () => {
  assert.equal(areAllLessonsCompleted(lessons), false)
  assert.equal(areAllLessonsCompleted(lessons.map((lesson) => ({ ...lesson, status: 'completed' }))), true)
  assert.equal(areAllLessonsCompleted([]), false)
})

test('does not treat an unknown lesson as accessible', () => {
  assert.equal(findLessonIndex(lessons, 99), -1)
  assert.equal(canAccessLesson(lessons, 99), false)
})
