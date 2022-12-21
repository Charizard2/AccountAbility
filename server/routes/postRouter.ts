import express, {Request,Response} from 'express';
import { request } from 'http';
import postController from '../controllers/postController'

const router = express.Router()

router.post('/post', postController.makePost, (req: Request, res: Response) => {
  return res.status(200).json({postRouter: 'works'})
});

router.get('/getPosts', postController.getPosts, (req: Request, res: Response) => {
  return res.status(200).json({posts: res.locals.posts})
})

export default router;