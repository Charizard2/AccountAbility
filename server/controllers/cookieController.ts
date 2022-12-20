import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express'
import bcrypt from 'bcrypt'
const saltRounds = 10;
interface cookieController  {
  setSSIDCookie: RequestHandler;
}

export const cookieController:cookieController = {

  setSSIDCookie: (req, res, next) => {
    const randomNumber = Math.random().toString()
    bcrypt.hash(randomNumber, saltRounds)
    .then(hashed=>{
      res.cookie('hashedCookie', hashed)
      res.cookie('random', 'test')
      return next()
    })
  },

};

