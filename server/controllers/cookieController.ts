import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import bcrypt from 'bcrypt'
const saltRounds = 10;
const db = require('../models/UserModel')
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
      return next()
    })
    .catch(err=> next({message:{err:'An error occured in setSSIDCookie'}}))
  },

  verifySSIDCookie: (req, res, next) => {
      if (!req.cookies.ssid) {
        res.locals.activeSession = false;
        return next();
      }
      const { username } = res.locals
      const queryString = `SELECT * FROM "Users" WHERE username=$1`
      db.query(queryString, [username])
      .then((data: any) => {
        bcrypt.compare(res.locals.cookie, data.rows[0].ssid)
        .then((cookie)=>{
          if (cookie) {
            res.locals.activeSession = true;
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
    const { username } = res.locals;
    const queryString = 'UPDATE "Users" SET "ssid"=NULL WHERE username=$1 RETURNING *;'
    db.query(queryString, [username])
    .then((data: any) => {
      console.log(data)
      return next()
    })
    .catch((err: any) => next({
      message:{err: 'Error occurred in logout'}
    }))
  }
};

