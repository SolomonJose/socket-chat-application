var {client}=require('../db/mysql');
var users=client;

let sql = "CREATE TABLE IF NOT EXISTS users1(email varchar(255) primary key ,username varchar(255),password varchar(255),phone int);"
users.query(sql, function (err, result) {
  if (err) throw err;
  console.log("User Table Ready");
});


module.exports={users};