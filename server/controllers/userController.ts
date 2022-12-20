import {Request, Response, NextFunction, RequestHandler, ErrorRequestHandler} from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;
//const RequestHandler = require('express')
//import  db  from '../models/UserModel'
const db = require('../models/UserModel')


type UserController = {
    createUser: RequestHandler;
    verifyUser: RequestHandler;
}

const userController: UserController = {
    //Inserts userInfo from setup page into user table
    createUser: async (req, res, next) => {

        const {username, password, firstname, lastname} = req.body;
        if (!username || !password || !firstname || !lastname) return next((err: ErrorRequestHandler)=> next({message:{err:'Please fill out all fields!'}}))
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, (err: any, hashedPW: string) => {
            if (err){
             return next(err)
            } else {
                const inputVal = [username, hashedPW, firstname, lastname];
                const queryString = 'INSERT INTO "Users"(username, password, firstname, lastname) VALUES($1,$2,$3,$4) RETURNING *';

                db.query(queryString, inputVal)
                .then((data: any) => {
                    //userInfo = await db.query(queryString,inputVal);
                    res.locals.usercreated = true;
                    console.log('user created successfully')
                    return next();
                }).catch((err: any) => {
                    res.locals.usercreated = false;
                    return next({
                        log: `Error occured in UserController.createUser`,
                        status: 500,
                        message: {err: 'An error occured'}
                    })
                })
            }
        }) 
    },
    verifyUser: async (req, res, next) => {
        const {username, password} = req.body;
        // if username exists, then compare hashedPassword
        const inputVal = [username]
        const queryString = 'SELECT password FROM "Users" WHERE username = $1'
        db.query(queryString, inputVal)
        .then((data: any) => {
            const hashed = data.rows[0].password;
            if (!hashed){
                 return next("No password found in database")
            } else {
                bcrypt.compare(password, hashed, (error: any, result: any) => {
                    if (result){
                        console.log('login successful')
                        return next()
                    } else {
                        console.log('Unsuccessful verify')
                        //return next('login ')
                        return(next(error))
                    }
                })

            }

        }).catch((err: any) => {
            return next({
                log: `Error occured in UserController.verifyUser`,
                status: 500,
                message: {err: 'An error occured'}

            })
        })

        
    }
}

 export default userController;
 export {};

