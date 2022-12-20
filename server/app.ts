import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/apiRouter'
import userRouter from './routes/userRouter'
import postRouter from './routes/postRouter'
import commentRouter from './routes/commentRouter'

export const app = express();

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

// app.use('/', express.static(path.resolve(__dirname, "../index.html")))

app.get('/', (req: Request, res: Response) => {
  return res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.get('/test', (req: Request, res: Response) => {
  return res.json({testMessage: 'hi you have made it'})
})

app.use('/user', userRouter)
app.use('/api', apiRouter)
app.use('/post', postRouter);
app.use('/comment', commentRouter)

app.use('/', (req: Request, res: Response) => {
  return res.sendStatus(404)
})

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'}
  }
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message)
})

