const mysql=require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "solomon",
  password: "solomon",
  database: "chatapp"
});

module.exports ={con};
