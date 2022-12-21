import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
const db = require('../models/UserModel')
// import db from '../models/UserModel';

require("dotenv").config()


interface jwtController {
  createToken: RequestHandler
}

export const jwtController:jwtController = {
  createToken: (req, res, next) => {
    const {username} = req.body
    const token = jwt.sign(username, process.env.JWT_SECRET, {expiresIn: "1h"})
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60000 
    })
  }
}