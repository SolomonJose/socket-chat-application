const express = require('express');
var app =express();

const {users} = require('./tables/users');

//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 5000;



app.get('/api/users',(req,res)=>{

     const users = [{name: "Donald"},{ name: "Solomon" }]
    res.json(users)
});



app.listen(port,() => {
    console.log('Server running on port 5000')
});