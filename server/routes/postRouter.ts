import express, {Request,Response} from 'express';
import { request } from 'http';
import postController from '../controllers/postController'

const router = express.Router()

router.post('/', postController.makePost, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.postCreated)
});

router.get('/', postController.getPosts, (req: Request, res: Response) => {
  return res.status(200).json({posts: res.locals.posts})
})

export default router;