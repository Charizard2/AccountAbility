
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Pool } = require('pg');

// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config();
//const url: any = process.env.PG_URI;
// const postgresUrl:any = process.env.POSTGRES_URL;
// console.log(postgresUrl)


const url: any = "postgres://gikinvtk:i42r3RHyuE74ohwb_c-bBCXROK6Atdba@hansken.db.elephantsql.com/gikinvtk";
const pool: any = new Pool({
    connectionString: url
});

module.exports = {
    query: (text: any, params: any, cb: any ) => {
        //console.log('text:', text)
        return pool.query(text, params, cb);
    },
};
export {}
// export default {
//     query: (text: any, params: any, cb: any ) => {
//         //console.log('text:', text)
//         return pool.query(text, params, cb);
//     },
// }