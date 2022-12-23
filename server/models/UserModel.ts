
// eslint-disable-next-line @typescript-eslint/no-var-requires

// import * as pkg from 'pg';
// const { Pool } = pkg;
// const { Pool } = require('pg');
import {Pool} from 'pg'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
//const url: any = process.env.PG_URI;
// const postgresUrl:any = process.env.POSTGRES_URL;
// console.log(postgresUrl)


const url: any = "postgres://gikinvtk:i42r3RHyuE74ohwb_c-bBCXROK6Atdba@hansken.db.elephantsql.com/gikinvtk";
const pool: any = new Pool({
    connectionString: url
});

export default  {
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


