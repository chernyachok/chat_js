var mongoose = require('mongoose');
var mongodb = require('./keys');
  mongoose.connect(mongodb.mongodb.mlabURL);
// set view engine
mongoose.connection.on('open', function(){
  console.log('connected to the data');
  
}).on('error', function(err){
  console.log(err);
});
module.exports = mongoose;
