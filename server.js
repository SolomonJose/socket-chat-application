const express = require('express');
const path = require('path');

const {users} = require('./tables/users');
const {chat} = require('./tables/chat');
//bodyparser
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Socket module
var socketIO = require('socket.io');  
const http = require('http');
var app =express();
var server = http.createServer(app);
var io = socketIO(server)



const port = process.env.PORT || 5000;

//routes
app.get('/',(req,res)=>{
  res.redirect(index.html)
});


io.on('connection',(socket)=>{
  console.log('New user connected');
  
});

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







server.listen(port,() => {
  console.log('Server running on port 5000')
});