import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import path from 'path'

export const app: Express = express();

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)

// app.use('/', express.static(path.resolve(__dirname, "../index.html")))

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.get('/test', (req, res) => {
  return res.json({testMessage: 'hi you have made it'})
})

// Catchall route handler
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

