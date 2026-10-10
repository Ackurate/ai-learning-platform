import { Router } from 'express'
import { submitQuiz, history } from '../controllers/quiz.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/submit', requireAuth, submitQuiz)
router.get('/history', requireAuth, history)

export default router
