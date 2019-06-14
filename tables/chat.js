var {client}=require('../db/mysql');
var chat=client;

let sql = "CREATE TABLE IF NOT EXISTS chat(from_user varchar(255),to_user varchar(255),message varchar(256));"
chat.query(sql, function (err, result) {
  if (err) throw err;
  console.log("CHat Table Ready");
});


module.exports={chat};