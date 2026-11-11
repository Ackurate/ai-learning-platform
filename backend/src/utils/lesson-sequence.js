export function findLessonIndex(lessons, lessonId) {
  return lessons.findIndex((lesson) => Number(lesson.lesson_id) === Number(lessonId))
}

export function canAccessLesson(lessons, lessonId) {
  const targetIndex = findLessonIndex(lessons, lessonId)
  return targetIndex >= 0 && lessons
    .slice(0, targetIndex)
    .every((lesson) => lesson.status === 'completed')
}

export function getFirstIncompleteLesson(lessons) {
  return lessons.find((lesson) => lesson.status !== 'completed') ?? null
}

export function areAllLessonsCompleted(lessons) {
  return lessons.length > 0 && lessons.every((lesson) => lesson.status === 'completed')
}
