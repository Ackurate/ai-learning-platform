import { Router } from 'express'
import { listChapters, getChapter } from '../controllers/chapters.controller.js'

const router = Router()

router.get('/', listChapters)
router.get('/:chapterId', getChapter)

export default router
