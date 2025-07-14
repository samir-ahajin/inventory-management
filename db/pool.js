const {Pool} = require('pg');
require('dotenv').config();
//detail one
// module.exports = new Pool({
//     host:"localhost",
//     user:"postgres",
//     database:"top_users",
//     password:"101496",
//     port:5432

// })

//more used connection string 
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL
});