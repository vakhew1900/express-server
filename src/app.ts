import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import usersRouter from './users/usersRouter'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/users', usersRouter)

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): void => {
    console.log(err)
    res.sendStatus(500)
  },
)

app.listen(3000, () => {
  console.log('Server is running')
})