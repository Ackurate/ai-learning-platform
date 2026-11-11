import assert from 'node:assert/strict'
import test from 'node:test'
import {
  canAccessLesson,
  canNavigateToAnotherLesson,
  canTakeChapterQuiz,
} from './lesson-navigation.js'

test('blocks switching while the self-check is unanswered', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionCount: 2,
    answeredCount: 0,
    checked: false,
  }), false)
})

test('blocks switching until the self-check questions have loaded', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionsReady: false,
    questionCount: 0,
    answeredCount: 0,
    checked: false,
  }), false)
})

test('blocks switching until every self-check question is answered', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionCount: 2,
    answeredCount: 1,
    checked: false,
  }), false)
})

test('blocks switching after answers until the server check succeeds', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionCount: 2,
    answeredCount: 2,
    checked: false,
  }), false)
})

test('does not unlock if a check result exists but not every question was answered', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionCount: 2,
    answeredCount: 1,
    checked: true,
  }), false)
})

test('allows switching after a successful check, regardless of correctness', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionCount: 2,
    answeredCount: 2,
    checked: true,
  }), true)
})

test('allows switching from a lesson already completed in saved progress', () => {
  assert.equal(canNavigateToAnotherLesson({
    alreadyCompleted: true,
    questionCount: 2,
    answeredCount: 0,
    checked: false,
  }), true)
})

test('does not trap a lesson that has fewer than two self-check questions', () => {
  assert.equal(canNavigateToAnotherLesson({
    questionsReady: true,
    questionCount: 1,
    answeredCount: 0,
    checked: false,
  }), true)
})

test('allows the first lesson and blocks later lessons until every earlier lesson is complete', () => {
  const lessons = [{ lesson_id: 1 }, { lesson_id: 2 }, { lesson_id: 3 }]
  const progress = { 1: 'completed', 2: 'not_started', 3: 'completed' }

  assert.equal(canAccessLesson(lessons, progress, 0), true)
  assert.equal(canAccessLesson(lessons, progress, 1), true)
  assert.equal(canAccessLesson(lessons, progress, 2), false)
})

test('allows revisiting an out-of-order completed lesson only after its predecessors are complete', () => {
  const lessons = [{ lesson_id: 1 }, { lesson_id: 2 }, { lesson_id: 3 }]
  const progress = { 1: 'not_started', 2: 'completed', 3: 'completed' }

  assert.equal(canAccessLesson(lessons, progress, 2), false)
  assert.equal(canAccessLesson(lessons, { ...progress, 1: 'completed' }, 2), true)
})

test('keeps the chapter quiz locked until every lesson is completed', () => {
  const lessons = [{ lesson_id: 1 }, { lesson_id: 2 }, { lesson_id: 3 }]

  assert.equal(canTakeChapterQuiz(lessons, { 1: 'completed', 2: 'completed', 3: 'not_started' }), false)
  assert.equal(canTakeChapterQuiz(lessons, { 1: 'completed', 2: 'completed', 3: 'completed' }), true)
  assert.equal(canTakeChapterQuiz([], {}), false)
})


test('allows navigation, access and quiz when isUnlocked is true', () => {
  const lessons = [{ lesson_id: 1 }, { lesson_id: 2 }]
  const progress = {}

  assert.equal(canNavigateToAnotherLesson({ isUnlocked: true, checked: false, answeredCount: 0, questionCount: 2 }), true)
  assert.equal(canAccessLesson(lessons, progress, 1, true), true)
  assert.equal(canTakeChapterQuiz(lessons, progress, true), true)
})
