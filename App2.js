//require the express module
const express = require("express");
const app = express();
const { users } = require('./tables/users');
const { chat } = require('./tables/chat');
const hbs = require('hbs');
//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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

//setup event listener
sockets.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on('create', function (room) {
    socket.join(room);
    console.log(room + ' in socket')
    roomn = room
  });
  socket.on('chat message', function (data) {
    console.log('message:' + data.message);

    socket.emit('received', { from: data.username, message: data.message });

    socket.broadcast.to(roomn).emit('received', { from: data.username, message: data.message });
    // io.to(room).emit('received',{from :data.username, message : data.message});






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

  }
  else {
    let stmt = `INSERT into users1(email,username,password,phone) VALUES ($1,$2,$3,$4) RETURNING *`;
    let todo = [req.body.email, req.body.username, req.body.psw, req.body.phone];
    users.query(stmt, todo, function (err, result) {
      if (err) { console.log(err); }


      console.log("1 record inserted");

      res.render('login.hbs')
    });

  }
});

app.post('/login', function (req, res) {

  var username = req.body.username;
  var currentuser = '';
  

  let stmt = 'SELECT * from users1 where username=$1 and password=$2';
  users.query(stmt, [req.body.username, req.body.password], function (err, result) {
   

    if (err) {
      console.log(err);
    }
    else {
     
      if (result.rows.length == 1) {
        var prevusers = []
        var allusers = []
        
       currentuser= result.rows[0].username



        let stmt2 = 'SELECT uto from roomtable where ufrom=$1';
        users.query(stmt2, [currentuser], function (err, result) {

          for (i = 0; i < result.rows.length; i++) {
            prevusers.push(result.rows[i].uto)

          }
        });
        let stmt3 = 'SELECT ufrom from roomtable where uto=$1';
        users.query(stmt3, [currentuser], function (err, result) {

          for (i = 0; i < result.rows.length; i++) {
            prevusers.push(result.rows[i].ufrom)

          }

        });
        console.log(prevusers)
        let stmt4 = 'SELECT username from users1 where username!=$1';
        users.query(stmt4, [currentuser], function (err, result) {
          console.log(allusers)
         

          for (i = 0; i < result.rows.length; i++) {
            allusers.push(result.rows[i].username)

          }

        });


        res.render('dashboard.hbs', { currentuser, prevusers, allusers });
      }
      else {
        res.json({
          "error": "true",
          "message": "Login failed ! Please register"
        });

      }

    }

  });
});

app.post('/openchat', (req, res) => {
  var from = req.body.from;
  var to = req.body.to;

  let stmt = 'SELECT roomname from roomtable where ufrom=$1 and uto=$2 or ufrom = $2  and uto=$1';
  users.query(stmt, [from, to], function (err, result) {
    if (err) {
      console.log(err);
    }

    else {

      if (result.rows.length == 1) {

        var room = result.rows[0].roomname
        res.render('chat.hbs', { room, from, to });


      }
      else {
        var room = 'room' + from + to
        let stmt = 'insert into roomtable values($1,$2,$3)';
        users.query(stmt, [room, from, to], function (err, result) {
          if (err) {
            console.log(err);

          }
          else {
            res.render('chat.hbs', { room, from, to });
          }

        });


      }

    }
  });







});

app.get('/test', (req, res) => {

  var roomname = 'room' + Math.floor(Math.random() * Math.floor(100))
  console.log(roomname)


});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
