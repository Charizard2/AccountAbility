
import {Pool} from 'pg'
require('dotenv').config();
const url: any = process.env.PG_URI;



const pool: any = new Pool({
    connectionString: url
});

export default {
    query: (text: any, params: any, cb?: any ) => {
        console.log('Query:', text)
        return pool.query(text, params, cb);
    },
}

// module.exports = {
//     query: (text: any, params: any, cb: any ) => {
//         //console.log('text:', text)
//         return pool.query(text, params, cb);
//     },
// };
// export {};


