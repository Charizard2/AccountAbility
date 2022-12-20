import express, {Request, Response} from 'express';
// import userController form '../controllers/userController

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
  return res.status(200).json({userRoute:' Works'})
})

router.get('/login', (req: Request, res: Response) => {
  return res.status(200).json({})
})
router.get('/signup', (req: Request, res: Response) => {
  return res.status(200).json({})
})
router.get('/logout', (req: Request, res: Response) => {
  return res.status(200).json({})
})

export default router