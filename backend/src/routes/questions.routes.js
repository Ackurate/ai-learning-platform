import { Router } from 'express'
import { listByChapter } from '../controllers/questions.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/chapter/:chapterId', requireAuth, listByChapter)

export default router
