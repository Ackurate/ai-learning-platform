export function canNavigateToAnotherLesson({
  alreadyCompleted = false,
  questionsReady = true,
  questionCount = 0,
  answeredCount = 0,
  checked = false,
  isUnlocked = false,
} = {}) {
  if (isUnlocked || alreadyCompleted) return true
  if (!questionsReady) return false
  if (questionCount < 2) return true
  return checked && answeredCount >= questionCount
}

export function canAccessLesson(lessons, lessonProgress, targetIndex, isUnlocked = false) {
  if (isUnlocked) return true
  if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= lessons.length) return false
  return lessons.slice(0, targetIndex).every(
    (lesson) => lessonProgress[lesson.lesson_id] === 'completed',
  )
}

export function canTakeChapterQuiz(lessons, lessonProgress, isUnlocked = false) {
  if (isUnlocked) return true
  return lessons.length > 0 && lessons.every(
    (lesson) => lessonProgress[lesson.lesson_id] === 'completed',
  )
}
