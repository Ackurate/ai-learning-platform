import { Router } from 'express'
import {
  getMyProgress,
  updateProgress,
  getLessonProgress,
  updateLessonProgress,
} from '../controllers/progress.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, getMyProgress)
router.get('/lessons/:chapterId', requireAuth, getLessonProgress)
router.put('/lessons/:chapterId/:lessonId', requireAuth, updateLessonProgress)
router.put('/:chapterId', requireAuth, updateProgress)

export default router
