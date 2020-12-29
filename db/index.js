const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
};

// const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const proConfig = {
    connectionString: process.env.DATABASE_URL
}; // heroku addons

// const pool = new Pool({
//     connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
// });
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = {
    query: (text, params) => pool.query(text, params),
};