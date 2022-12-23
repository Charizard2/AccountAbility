import {Request, Response, NextFunction, RequestHandler, ErrorRequestHandler} from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import db from '../models/UserModel'



type UserController = {
    createUser: RequestHandler;
    verifyUser: RequestHandler;
    // deleteCypressUser: RequestHandler;
}

const userController: UserController = {
    createUser: async (req, res, next) => {
        const {username, password, firstName, lastName} = req.body;
        bcrypt.hash(password, saltRounds, (err: any, hashedPW: string) => {
            if (err){
             return next({
                message: {err: 'Error occured in userController.createUser'}
             })
            } 
            else {
                const inputVal = [username, hashedPW, firstName, lastName];
                const queryString = 'INSERT INTO "Users"(username, password, firstName, lastName) VALUES($1,$2,$3,$4) RETURNING *'
                db.query(queryString, inputVal)
                .then((data: any) => {
                    res.locals.username = username
                    res.locals.userCreated = true;
                    console.log('user created successfully')
                    return next();
                })
                .catch((err: any) => {
                    res.locals.userCreated = false;
                    return next({
                        log: `Error occured in UserController.createUser`,
                        status: 500,
                        message: {err: 'An error occured in userController.createUser'}
                    })
                })
            }
        }) 
    },
    verifyUser: async (req, res, next) => {
        const {username, password} = req.body;
        res.locals.username = username
        const inputVal = [username]
        const queryString = 'SELECT * FROM "Users" WHERE username =$1'
        db.query(queryString, inputVal)
        .then((data: any)=>{
            if (!data.rows[0]) {
                console.log('User does not exist!')
                res.locals.userExists = false;
                return res.status(401).json(res.locals)
            }
            bcrypt.compare(password, data.rows[0].password)
            .then(hash=> {
                if (hash){
                    console.log('Login successful!')
                    return next()
                }
                console.log('Password does not match')
                res.locals.passwordCheck = false
                return res.status(401).json(res.locals)
            })
            .catch((err) => {
                return next({
                    message: {err: 'An error occured in userController.verifyUser'}
                })
            })
        })
        .catch((err: any) => {
            return next({
                log: `Error occured in UserController.verifyUser`,
                status: 500,
                message: {err: 'An error occured in userController.verifyUser'}

            })
        })
    },
    
    // deleteCypressUser: async (req, res, next) => {
    //    const cypressUser = 'asdfasdfasdfasdf' 
    //     const queryString = `DELETE FROM "Users" WHERE username=$1`
    //     db.query(queryString, [cypressUser])
    //     .then((data:any)=>{
    //         console.log('Cypress test username deleted')
    //         return next()
    //     })
    // },
}

 export default userController;

/*
UPDATE "public"."Users" SET "ssid"='fsdf' WHERE "user_id"=32 RETURNING "username", "password", "firstname", "lastname", "user_id", "ssid";

*/