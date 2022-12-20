import express, {Request, Response} from 'express';
// import userController form '../controllers/userController
import { cookieController } from '../controllers/cookieController';

const router = express.Router()

router.get('/test', cookieController.setSSIDCookie, (req: Request, res: Response) => {
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