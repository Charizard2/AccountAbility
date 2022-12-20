import express, {Request,Response} from 'express';
// import postController from '../controllers/postController'

const router = express.Router()

router.get('/test', (req: Request, res: Response) => {
  return res.status(200).json({postRouter: 'works'})
})

export default router