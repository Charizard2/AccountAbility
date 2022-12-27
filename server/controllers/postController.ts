
import {RequestHandler} from 'express';
import db from '../models/UserModel'
import bcrypt from 'bcrypt'
type PostController = {
    makePost: RequestHandler;
    getPosts: RequestHandler;
}

//Post table - PostId(unique), postContent, timecreated,likes, userId(for)
const postController: PostController = {
    
    makePost: async (req, res, next) => {
        // when user makes post, compare cookie to validate user
        const likes = 0; 
        let id: any = undefined; 
        const {post } = req.body;
        const {ssid} = req.cookies
        const value = [ssid]
        // bcrypt.compare(ssid)
        const findUserText = 'SELECT * FROM "Users" WHERE ssid = $1'
        db.query(findUserText, value)
        .then((data: any) => {
            const {username, firstname, lastname, user_id} = data.rows[0]
            const inputVal = [post, user_id, likes];
            const queryString = `INSERT INTO "Post_Table"(content, id, likes) VALUES($1, $2, $3) RETURNING *`;
            db.query(queryString, inputVal)
                     .then((data: any) => { 
                        // console.log(data.rows[0])
                        console.log('post was successfully created')
                         res.locals.postCreated = true;
                         return next();
                     })
                     .catch((err: any) => {
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
   
        const queryString = 'SELECT * FROM "Post_Table"'
        db.query(queryString, [])
        .then((data: any) => {
             console.log('fetching posts', data.rows)
             res.locals.posts = data.rows
                   return next()
            })
            .catch((err:any)=> {
                return next({
                    log:'Error in postController.getPosts',
                    status:500,
                    message:{err:'An error occured in postControler.getPosts'}
                })
            })
        },
    // getPosts: async (req, res, next) => { 
    //     let id: any = undefined; 
    //     const {username } = req.body;
    //     const inputVal2 = [username]
    //     const queryString2 = 'SELECT user_id FROM "Users" WHERE username = $1'
    //     db.query(queryString2, inputVal2)
    //     .then((data: any) => {
    //          id = data.rows[0].user_id;
    //          const inputVal = [ id ];
    //          const queryString = 'SELECT content FROM "Post_Table" WHERE id = $1'
    //             db.query(queryString, inputVal)
    //             .then((data: any) => {
    //             console.log(data.rows)
    //             res.locals.posts = data.rows;
    //                 if (!data){
    //                     return next("No posts")
    //                 } else {
    //                     return next();
    //                     }})
    //         }).catch((err: any) => {
    //             return next(err)
    //         })
    //     },
};




export default postController;
