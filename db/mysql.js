var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "	postgres://zsospnmc:e6vlpX4OHqpnqp0adleglr-RfTR8GtR2@isilo.db.elephantsql.com:5432/zsospnmc" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  
});
module.exports={client};
