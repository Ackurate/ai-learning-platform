export const normalizeQuizAnswer = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ')

export function calculateQuizResult(questions, answers) {
  let totalCorrect = 0
  let totalUnanswered = 0

  for (const question of questions) {
    const answer = answers[question.question_id]
    if (answer == null || !String(answer).trim()) {
      totalUnanswered++
    } else if (normalizeQuizAnswer(answer) === normalizeQuizAnswer(question.correct_answer)) {
      totalCorrect++
    }
  }

  const totalQuestions = questions.length
  const rawScore = totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0
  const score = Math.round(rawScore * 100) / 100

  return {
    score,
    total_correct: totalCorrect,
    total_incorrect: totalQuestions - totalCorrect - totalUnanswered,
    total_unanswered: totalUnanswered,
    total_questions: totalQuestions,
    passed: rawScore > 70,
  }
}
