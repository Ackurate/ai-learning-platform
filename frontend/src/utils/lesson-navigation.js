export function canNavigateToAnotherLesson({
  alreadyCompleted = false,
  questionsReady = true,
  questionCount = 0,
  answeredCount = 0,
  checked = false,
} = {}) {
  if (alreadyCompleted) return true
  if (!questionsReady) return false
  if (questionCount < 2) return true
  return checked && answeredCount >= questionCount
}
