const express = require('express');
var app =express();

const {users} = require('./tables/users');
const {chat} = require('./tables/chat');

//bodyparser
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;



// app.post('/login',(req,res)=>{
//     var username = req.body.username
//     var password = req.body.password

//     let stmt = `SELECT * FROM users1 WHERE username=$1 AND password=$2`;
//   //let todo = [req.body.username,req.body.email,req.body.password,false];
//   users.query(stmt,[req.body.username,req.body.password],function (err, result,fields) {
//   //  if (err) throw err;
//     if(result[0].username ==req.body.username && result[0].password==req.body.password){
      
//       res.send("Logged in")
//     }
//     //console.log(result);
//     //console.log(result[0].username+'hello');

//     //res.render('Public/Home/Aunthentication/otp.hbs');
//   });
    



//      res.send("LOgin not successful");
// });



app.post('/login',function(req,res){
    console.log(req.body)
    let stmt = 'SELECT * from users1 where username=$1 and password=$2';
    users.query(stmt,[req.body.username,req.body.password],function(err,result){
      console.log(result.rows.length)
      if(err){
          console.log(err);
        }
        else{
            if (result.rows.length!=0){
              //req.session.key=req.body.email;
              //console.log(req.session)
              res.send('done');
            }
            else{
              res.json({
                "error" : "true",
                "message" : "Login failed ! Please register"
              });
            }
    
        }
  
  });
  });


app.post('/signup',(req,res)=>{
    // console.log(req.body);
  
    let stmt = `INSERT into users1(email,username,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
    let todo = [req.body.email,req.body.username,req.body.password,req.body.phone];
    users.query(stmt,todo, function (err, result) {
      if (err){console.log(err);}
        
    console.log(req.body.email,req.body.username,req.body.password,req.body.phone)
      console.log("1 record inserted");
      
      res.send('user signed up')
    });
  });

//   app.post('/reply',(req,res)=>{
//     // console.log(req.body);
  
//     let stmt = `INSERT into users1(email,username,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
//     let todo = [req.body.email,req.body.username,req.body.password,req.body.phone];
//     users.query(stmt,todo, function (err, result) {
//       if (err){console.log(err);}
        
//     console.log(req.body.email,req.body.username,req.body.password,req.body.phone)
//       console.log("1 record inserted");
      
//       res.send('user signed up')
//     });
//   });





app.listen(port,() => {
    console.log('Server running on port 5000')
});