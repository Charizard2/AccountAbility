import express, {Request, Response} from 'express';
// import apiController from '../controllers/apiController';

const router = express.Router()

router.get('/test', (req: Request, res:Response ) => {
  return res.status(200).json({apiRouter: ' Works!'})
})

export default router