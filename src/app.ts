import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import usersRouter from './features/users/usersRouter'
import errorHandler from './lib/errorHandler'
import postsRouter from './features/posts/postsRouters'
import cors from 'cors'
export const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  }),
)

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use(errorHandler)
