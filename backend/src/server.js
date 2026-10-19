import 'dotenv/config'
import { app } from './app.js'
import { ensureRequiredEnv } from './config/env.js'

ensureRequiredEnv()

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server chạy tại cổng ${port}`))
