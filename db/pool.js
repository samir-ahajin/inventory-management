const {Pool} = require('pg');

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
  connectionString: "postgresql://postgres:101496@localhost:5432/top_users"
});