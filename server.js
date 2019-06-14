const express = require('express');
var app =express();

const {users} = require('./tables/users');

//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 5000;



app.get('/login',(req,res)=>{
    console.log(req.body.username)
    console.log(req.body.password)
     
});



app.listen(port,() => {
    console.log('Server running on port 5000')
});