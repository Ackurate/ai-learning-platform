import { Router } from 'express'
import { submitQuiz, checkLessonQuiz, history } from '../controllers/quiz.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/submit', requireAuth, submitQuiz)
router.post('/check-lesson', requireAuth, checkLessonQuiz)
router.get('/history', requireAuth, history)

export default router
