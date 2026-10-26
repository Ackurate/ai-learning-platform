import { Router } from 'express'
import { listChapters, getChapter, listLessons, listLessonQuestions } from '../controllers/chapters.controller.js'

const router = Router()

router.get('/', listChapters)
router.get('/:chapterId/lessons/:lessonId/questions', listLessonQuestions)
router.get('/:chapterId/lessons', listLessons)
router.get('/:chapterId', getChapter)

export default router
