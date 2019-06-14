var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://qwgxcxyz:hEx9a3_LNg0YhKLzQUr_tSCA3NEZec0P@packy.db.elephantsql.com:5432/qwgxcxyz" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  
});
module.exports={client};
