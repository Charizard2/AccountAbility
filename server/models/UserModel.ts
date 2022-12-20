
const { Pool } = require('pg');
require("dotenv").config();
//const url: any = process.env.PG_URI;
const url: any = "postgres://gikinvtk:i42r3RHyuE74ohwb_c-bBCXROK6Atdba@hansken.db.elephantsql.com/gikinvtk";
const pool: any = new Pool({
    connectionString: url
});

module.exports = {
    query: (text: any, params: any, cb: any ) => {
        //console.log('text:', text)
        return pool.query(text, params, cb);
    },
}

export {};
