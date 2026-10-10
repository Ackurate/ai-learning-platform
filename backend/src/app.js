import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.routes.js'
import chaptersRoutes from './routes/chapters.routes.js'
import questionsRoutes from './routes/questions.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import progressRoutes from './routes/progress.routes.js'
import aiRoutes from './routes/ai.routes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '100kb' }))

// Giới hạn số request để chống spam
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/chapters', chaptersRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/progress', progressRoutes)
// AI tốn chi phí nên giới hạn chặt hơn
app.use('/api/ai', rateLimit({ windowMs: 60 * 1000, limit: 20 }), aiRoutes)

app.use(notFound)
app.use(errorHandler)
