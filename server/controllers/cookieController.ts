import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import bcrypt from 'bcrypt'
const saltRounds = 10;
import db from '../models/UserModel'

interface cookieController  {
  setSSIDCookie: RequestHandler;
  verifySSIDCookie: RequestHandler
  logout: RequestHandler
}

export const cookieController:cookieController = {

  setSSIDCookie: (req, res, next) => {
    let randomNumber = Math.random().toString()
    randomNumber = randomNumber.substring(2,randomNumber.length);
    // store cookie to compare with hashed cookie later
    res.locals.cookie = randomNumber

    bcrypt
    .hash(res.locals.cookie, saltRounds)
    .then((hashed)=>{
      res.locals.hashedCookie = hashed
      res.cookie('ssid', hashed, {maxAge: 9999*9999, httpOnly:true})
      db.query(`UPDATE "Users" SET ssid=$1 WHERE username=$2`, [res.locals.hashedCookie, res.locals.username])
      console.log('cookie has been set')
      return next()
    })
    .catch(err=> next({message:{err:'An error occured in setSSIDCookie'}}))
  },
// res.locals.cookie and req.cookie not good
  verifySSIDCookie: (req, res, next) => {
      if (!req.cookies) {
        res.locals.activeSession = false;
        return next();
      }
      const { username } = res.locals
      const queryString = `SELECT * FROM "Users" WHERE username=$1`
      db.query(queryString, [username])
      .then((data: any) => {
        console.log('123',res.locals.cookie, data.rows[0].ssid)
        bcrypt.compare(res.locals.cookie, data.rows[0].ssid)
        .then((cookie)=>{
          if (cookie) {
            res.locals.activeSession = true;
            console.log('cookie matched, session started')
            return next()
          }
          else {
            res.locals.activeSession = false
            return next()
          }
        })
        .catch((err:any) => next({
          message:{err: 'An error occured in verifySSIDCookie'}
        }))

      })
      .catch((err:any)=>next({
        message:{ err: 'An error occurred in verifySSIDCookie' }
      }))
  },
  logout: (req, res, next) => {
    console.log(req.cookies)
    res.clearCookie('ssid')
    console.log(req.cookies)
    return next()
    // const { username } = res.locals;
    // const queryString = 'UPDATE "Users" SET "ssid"=NULL WHERE username=$1 RETURNING *;'
    // db.query(queryString, [username])
    // .then((data: any) => {
    //   console.log('Cookie has been deleted, user logged out')
    //   return next()
    // })
    // .catch((err: any) => next({
    //   message:{err: 'Error occurred in logout'}
    // }))
  }
};

