var {client}=require('../db/mysql');
var users=client;

let sql = "CREATE TABLE IF NOT EXISTS users(id varchar(255) primary key,fullname varchar(255),username varchar(255),password varchar(255),phone int);"
users.query(sql, function (err, result) {
  if (err) throw err;
  console.log("User Table Ready");
});


module.exports={users};