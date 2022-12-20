// import {RequestHandler} from 'express'
// import db from '../models/UserModel'

// type UserController = {
//     saveUser: RequestHandler;
// }

// const userController: UserController = {
//     //Inserts userInfo from setup page into user table
//     saveUser: async (req, res, next) => {
//         const {username, password, firstname, lastname} = req.body;
//         const inputVal = [username, password, firstname, lastname];
//         const queryString = 'INSERT INTO user(username, password, firstname, lastname) VALUES($1,$2,$3,$4) RETURNING *';
//         let userInfo;
//         try {
//             userInfo = await db.query(queryString,inputVal);
//             res.locals.usersaved = true;
//             return next();
//         } catch (err) {
//             res.locals.usersaved = false;
//             return next({
//                 log: err,'Express error handler caught userController.saveUser middleware',
//                 status: 500,
//                 message: {err: 'An error occured'}
//             })
//         }
//     }
// }

//  export default userController