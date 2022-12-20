import express, {Request,Response} from 'express';
// import commentController from '../controllers/commentController'

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
  return res.status(200).json({commentRouter: 'works'})
})

export default router