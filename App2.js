//require the express module
const express = require("express");
const app = express();


const { users} = require('./tables/users');
const {chat} = require('./tables/chat');
const hbs = require('hbs');

const alert = require('alert-node');
//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

//set the express.static middleware
app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public')
app.set('view engine', 'hbs');
//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = 5000;

//bodyparser middleware
app.use(bodyParser.json());





// app.set('view engine','html');
//integrating socketio
sockets = io(http);
var roomn = '';
var grproom = '';

//setup event listener
sockets.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on('create', function (room) {
    socket.join(room);
    roomn = room
  });
  socket.on('chat message', function (data) {
    var fromuser = data.username;
    var touser = data.to;
    var usermessage = data.message;

    let stmt = 'insert into chatbuffer values($1,$2,$3);';

    users.query(stmt, [fromuser, touser, usermessage], function (err, result) {
      if (err) throw err;

    });







    socket.emit('received', {
      from: data.username,
      message: data.message
    });
    console.log('This', roomn);
    socket.broadcast.to(roomn).emit('received', {
      from: data.username,
      message: data.message
    });
    // io.to(room).emit('received',{from :data.username, message : data.message});






  });


  //socket configuration for group chat

  socket.on('creategrp', function (room) {
    socket.join(room);
    grproom = room

  });

  socket.on('grpchat message', function (data) {
    var fromuser = data.username;
    var id = data.id;
    var usermessage = data.message;

    let stmt = 'insert into groupchat values($1,$2,$3);'; //id message fromuser

    users.query(stmt, [id,usermessage,fromuser], function (err, result) {
      if (err) throw err;


    });


    socket.emit('grpreceived', {
      from: data.username,
      message: data.message
    });
    // console.log('This', );
    socket.broadcast.to(grproom).emit('grpreceived', {
      from: data.username,
      message: data.message
    });

  });



});

app.get('/', (req, res) => {

  res.render('login.hbs');
});

app.get('/signuppage', (req, res) => {

  res.render('signup.hbs');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  if (req.body.psw != req.body.repeat) {
    console.log('Passswords dont match');
    res.render('signup.hbs');

  } else {
    let stmt = `INSERT into users1(email,username,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
    let todo = [req.body.email, req.body.username, req.body.psw, req.body.phone];
    users.query(stmt, todo, function (err, result) {
      if (err) {
        console.log(err);
      }

      res.render('login.hbs')
    });

  }
});

app.post('/login', function (req, res) {

  var username = req.body.username;
  var currentuser = '';
  var flag = 0;
  var tobj = [];
  var prevusers = [];
  var allusers = [];


  let stmt = 'SELECT * from users1 where username=$1 and password=$2';
  users.query(stmt, [req.body.username, req.body.password], function (err, result) {


    if (err) throw err;

    if (result.rows.length == 1) {

      currentuser = result.rows[0].username

      let stmt2 = 'SELECT uto from roomtable where ufrom=$1';
      users.query(stmt2, [currentuser], function (err, result) {

        for (i = 0; i < result.rows.length; i++) {
          prevusers.push({ user: result.rows[i].uto })

        }

        let stmt3 = 'SELECT ufrom from roomtable where uto=$1';
        users.query(stmt3, [currentuser], function (err, result) {

          for (i = 0; i < result.rows.length; i++) {
            prevusers.push({ user: result.rows[i].ufrom })

          }

          let stmt4 = 'SELECT username from users1 where username!=$1';
          users.query(stmt4, [currentuser], function (err, result) {


            for (i = 0; i < result.rows.length; i++) {
              allusers.push({ user: result.rows[i].username })

            }
            res.render('dashboard.hbs', { currentuser, prevusers, allusers });

          });

        });

      });



    } else {
      res.json({
        "error": "true",
        "message": "Login failed ! Please register"
      });
    }



  });

});




app.post('/openchat', (req, res) => {
  var from = req.body.from;
  var to = req.body.to;

  let stmt2 = 'SELECT * from chatbuffer where fromuser=$1 and touser=$2 or fromuser = $2  and touser=$1';
  users.query(stmt2, [from, to], function (err, result) {
    var bufferarray = result.rows;








    let stmt = 'SELECT roomname from roomtable where ufrom=$1 and uto=$2 or ufrom = $2  and uto=$1';
    users.query(stmt, [from, to], function (err, result) {
      if (err) {
        console.log(err);
      } else {

        if (result.rows.length == 1) {

          var room = result.rows[0].roomname
          res.render('chat.hbs', {
            room,
            from,
            to,
            bufferarray
          });


        } else {
          var room = 'room' + from + to
          let stmt = 'insert into roomtable values($1,$2,$3)';
          users.query(stmt, [room, from, to], function (err, result) {
            if (err) {
              console.log(err);

            } else {
              res.render('chat.hbs', {
                room,
                from,
                to
              });
            }

          });


        }

      }
    });
  });







});

app.post('/creategrp',(req,res)=>{
  var username = req.body.usr
  currentuser = username
  console.log(req.body);
  
  let stmt = 'SELECT username from users1 where username!=$1';

  users.query(stmt, [username], function (err, result) {
    var allusers = [];
    if(err) console.log( err);
    console.log(result.rows);


    for (i = 0; i < result.rows.length; i++) {
      allusers.push({ user: result.rows[i].username })

    }
    console.log(allusers);






    res.render('creategrp.hbs',{allusers,currentuser});

  });
  
  
  
});
app.post('/opengrpchat',(req,res)=>{
  
  var admin = req.body.from;
  var from = admin;
  var groupname = req.body.groupname;
  var room = groupname + admin;
 

  var members = req.body.members;
  members = members.slice(0,members.length-1)

  var stmt = "select groupname from grouptable where groupname = $1 and admin = $2;";

  users.query(stmt,[groupname,admin],function(err,result){

    if(err) throw err;

    if(result.rows.length > 0){
      
      res.json({

        message : "Group name already taken!!"
      });
    }
    else{

      
  var stmt = "insert into grouptable(groupname ,admin,members) values($1,$2,$3)";

  users.query(stmt,[groupname,admin,members],function(err,result){

    if(err) throw err;
    var stmt2 = "select groupid from grouptable where groupname = $1 and admin = $2";
    users.query(stmt2,[groupname,admin],function(err,result){

      var id = result.rows[0].groupid;
      console.log(id);


      res.render('grpchat.hbs',{from,groupname,members,room,id});





    });

    
    




  });



      


    }




  });






  // let stmt = 'SELECT roomname from roomtable where ';
  //   users.query(stmt, [from, to], function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {

  //       if (result.rows.length == 1) {

  //         var room = result.rows[0].roomname
  //         res.render('chat.hbs', {
  //           room,
  //           from,
  //           to,
  //           bufferarray
  //         });


  //       } else {
  //         var room = 'room' + from + to
  //         let stmt = 'insert into roomtable values($1,$2,$3)';
  //         users.query(stmt, [room, from, to], function (err, result) {
  //           if (err) {
  //             console.log(err);

  //           } else {
  //             res.render('chat.hbs', {
  //               room,
  //               from,
  //               to
  //             });
  //           }

  //         });


  //       }

  //     }
  //   });






  
  
  


  });
  
// Route for routing to already created group
  
// app.post('',{



// });
  
app.get('/landing',(req,res)=>{

  let stmt = 'SELECT * from grouptable where admin!=$1'; // regex matching for members required

  users.query(stmt, [username], function (err, result) {
    var allusers = [];
    if(err) console.log( err);
    console.log(result.rows);


    for (i = 0; i < result.rows.length; i++) {
      allusers.push({ user: result.rows[i].username })

    }
    console.log(allusers);



  res.render('landing.hbs',{groups});






});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});