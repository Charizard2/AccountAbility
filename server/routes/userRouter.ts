import express, {Request, Response} from 'express';
import userController from '../controllers/userController';
import { cookieController } from '../controllers/cookieController';
import  postController  from '../controllers/postController';
const router = express.Router()

router.get('/test',  cookieController.verifySSIDCookie, (req: Request, res: Response) => {
  return res.status(200).json({userRoute:' Works'})
})
router.post('/test',  userController.createUser, cookieController.setSSIDCookie, cookieController.verifySSIDCookie, (req: Request, res: Response) => {
  console.log(res.locals)
// router.post('/test', postController.makePost, cookieController.setSSIDCookie, (req: Request, res: Response) => {
  return res.status(200).json({userRoute:' Works'})
})
// userController.verifyUsername, bcrypt.verifyPassword, cookieController.setCookie,   
// reacType: userCOntroller.verifyUser, cookieController.setSSIDCookie, sessionController.startSession
router.get('/login', (req: Request, res: Response) => {
  return res.status(200).json({})
})

// userController.createUser (check if username exists), bcrypt.hashPassword (hash PW and send username/pw to DB),  
// reacType: userController.createUser, cookieController.setSSIDCookie, sessionController.startSession
router.get('/signup', (req: Request, res: Response) => {
  return res.status(200).json({})
})
// userController.logout (delete hashed cookie)
router.get('/logout', (req: Request, res: Response) => {
  return res.status(200).json({})
})

export default router