//require the express module
const express = require("express");
const app = express();
const {users} = require('./tables/users');
const {chat} = require('./tables/chat');
const hbs =require('hbs');
//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//set the express.static middleware
app.use(express.static(__dirname + '/public' ));
console.log(__dirname + '/public')
app.set('view engine','hbs');
//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = 5000;

//bodyparser middleware
app.use(bodyParser.json());





// app.set('view engine','html');
//integrating socketio
socket = io(http);


//setup event listener
socket.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on('chat message',function(data){
      console.log('message:'+data.message);
      
      socket.emit('received',{from :data.username, message : data.message});

      socket.broadcast.emit('received',{from :data.username, message : data.message});   

  });
  
});

app.get('/',(req,res)=>{

    res.render('login.hbs');
});

app.get('/signuppage',(req,res)=>{

    res.render('signup.hbs');
});

app.post('/signup',(req,res)=>{
    console.log(req.body);
    if(req.body.psw!=req.body.repeat){
        console.log('Passswords dont match'); 
        res.render('signup.hbs');

    }
    else{
        let stmt = `INSERT into users1(email,username,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
    let todo = [req.body.email,req.body.username,req.body.psw,req.body.phone];
    users.query(stmt,todo, function (err, result) {
      if (err){console.log(err);}
        
    
      console.log("1 record inserted");
      
      res.render('login.hbs')
    });

    } 
  });

  app.post('/login',function(req,res){
    console.log(req.body)
    var username = req.body.username;
    let stmt = 'SELECT * from users1 where username=$1 and password=$2';
    users.query(stmt,[req.body.username,req.body.password],function(err,result){
      console.log(result.rows.length)
      if(err){
          console.log(err);
        }
        else{
            if (result.rows.length!=0){
              prevusers = [{user:'Solomon'},{user:'Dolomon'},{user:'Molomon'}]
              allusers = [{user:'Solomon'},{user:'Tolomon'},{user:'Molomon'}]

              res.render('dashboard.hbs',{username,prevusers,allusers});
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

  app.post('/openchat',(req,res)=>{
    var username = req.body.user;
    var to = req.body.to;
    res.render('chat.hbs',{username,to});



  });


http.listen(port, () => {
  console.log("Running on Port: " + port);
});
