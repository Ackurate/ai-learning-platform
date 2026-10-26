import assert from 'node:assert/strict'
import test from 'node:test'
import { canNavigateToAnotherLesson } from './lesson-navigation.js'

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
