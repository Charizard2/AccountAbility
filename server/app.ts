import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/apiRouter'
import userRouter from './routes/userRouter'
import postRouter from './routes/postRouter'
import commentRouter from './routes/commentRouter'
import cors from 'cors'
import session from 'express-session'
import filestore, {FileStore} from 'session-file-store'

export const app = express();

// parsing client requests
app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(cors())
app.use(cookieParser())

// serve static assets
// app.use('/', express.static(path.resolve(__dirname, "../index.html")))

// create session once user enters our domain
app.use(session({
  name: 'beginner-cookie',
  secret: 'secret-value',
  saveUninitialized: false,
  resave: false,
  // store: new filestore()
}))

// verifies session everytime user visits a page


// serves index.html page
app.get('/', (req: Request, res: Response) => {
  return res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.get('/test', (req: Request, res: Response) => {
  return res.json({testMessage: 'hi you have made it'})
})

// should ideally route everything to /api, then reroute from there
// app.use('/api', apiRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter)


// catch-all route handler
app.use('/', (req: Request, res: Response) => {
  return res.sendStatus(404)
})

// global error handler
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occured'}
  }
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message)
})

