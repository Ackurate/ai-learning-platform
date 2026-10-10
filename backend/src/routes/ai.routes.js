import { Router } from 'express'
import { ask } from '../controllers/ai.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/ask', requireAuth, ask)

export default router
