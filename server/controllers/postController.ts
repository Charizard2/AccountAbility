/* eslint-disable @typescript-eslint/no-var-requires */

import {RequestHandler} from 'express';
const db = require('../models/UserModel');

type PostController = {
    makePost: RequestHandler;
    getPosts: RequestHandler;
}

//Post table - PostId(unique), postContent, timecreated,likes, userId(for)
const postController: PostController = {
    
    makePost: async (req, res, next) => {
        const likes = 0; 
        let id: any = undefined; 
        const {content, username } = req.body;
        const inputVal2 = [username]
        const queryString2 = 'SELECT user_id FROM "Users" WHERE username = $1'
        db.query(queryString2, inputVal2)
        .then((data: any) => {
             id = data.rows[0].user_id;
             const inputVal = [content, id, likes];
             console.log('id', id)
             const queryString = `INSERT INTO "Post_Table"(content, id, likes) VALUES($1, $2, $3)`;
             db.query(queryString, inputVal)
                     .then((data: any) => {
                         console.log('success making post')
                         //userInfo = await db.query(queryString,inputVal);
                         res.locals.postCreated = true;
                         console.log('post created successfully')
                         return next();
                     }).catch((err: any) => {
                         res.locals.postCreated = false;
                         return next({
                             log: `Error occured in postController.makePost`,
                             status: 500,
                             message: {err: 'An error occured'}
                         })
                     })
        }).catch((err: any) => {
            return next(err)
        });
      
       //NSERT INTO Orders ( userid, timestamp) 
//SELECT Orders.userid, Orders.timestamp FROM Users INNER JOIN Orders ON  Orders.id = Users.id
        //if ( !content || !username || !id) return next("Error in postController.makePost");
                // `INSERT INTO "Post_Table"(content) VALUES($1) 
             // 'SELECT FROM "Post_Table" as p LEFT JOIN  "Users" as u on p.id = u.user_id'
    },


    getPosts: async (req, res, next) => { 
        let id: any = undefined; 
        const {username } = req.body;
        const inputVal2 = [username]
        const queryString2 = 'SELECT user_id FROM "Users" WHERE username = $1'
        db.query(queryString2, inputVal2)
        .then((data: any) => {
             id = data.rows[0].user_id;
             const inputVal = [ id ];
             const queryString = 'SELECT content FROM "Post_Table" WHERE id = $1'
                db.query(queryString, inputVal)
                .then((data: any) => {
                console.log(data.rows)
                res.locals.posts = data.rows;
                    if (!data){
                        return next("No posts")
                    } else {
                        return next();
                        }})
            }).catch((err: any) => {
                return next(err)
            })
        },
};




export default postController;
export {};
