import {Request, Response, NextFunction, RequestHandler, ErrorRequestHandler} from 'express';
import bcrypt from 'bcrypt';
const saltRounds = 10;
//const RequestHandler = require('express')
// import  db  from '../models/UserModel'
//import  db  from '../models/UserModel'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../models/UserModel')


type UserController = {
    createUser: RequestHandler;
    verifyUser: RequestHandler;
    // deleteCypressUser: RequestHandler;
}

const userController: UserController = {
    //Inserts userInfo from setup page into user table
    createUser: async (req, res, next) => {
        console.log('in create user');
        const {username, password, firstName, lastName} = req.body;
        if (!username || !password || !firstName || !lastName) return next({message:{err:'Please fill out all fields!'}})
        // if (username === 'asdfasdfasdfasdf'){
        //     //const inputy = []
            
        //     const queryString = `DELETE FROM "Users" WHERE username="asdfasdfasdfasdf"`;
        //     //await
        //      db.query(queryString)
        // }

        const saltRounds = 10
        bcrypt.hash(password, saltRounds, (err: any, hashedPW: string) => {
            if (err){
             return next(err)
            } else {
               
                const inputVal = [username, hashedPW, firstName, lastName];
                const queryString = 'INSERT INTO "Users"(username, password, firstName, lastName) VALUES($1,$2,$3,$4) RETURNING *'
                db.query(queryString, inputVal)
                .then((data: any) => {
                    //userInfo = await db.query(queryString,inputVal);
                    res.locals.username = username
                    res.locals.usercreated = true;
                    console.log('user created successfully')
                    return next();
                }).catch((err: any) => {
                    res.locals.usercreated = false;
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
 export {};

/*
UPDATE "public"."Users" SET "ssid"='fsdf' WHERE "user_id"=32 RETURNING "username", "password", "firstname", "lastname", "user_id", "ssid";

*/