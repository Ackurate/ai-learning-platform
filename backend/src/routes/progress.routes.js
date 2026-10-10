import { Router } from 'express'
import { getMyProgress, updateProgress } from '../controllers/progress.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, getMyProgress)
router.put('/:chapterId', requireAuth, updateProgress)

export default router
