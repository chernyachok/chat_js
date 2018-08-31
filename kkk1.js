var express = require('express');
var app = express();

app.listen(8000, function(){
  console.log('port 8000');
});

app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {

  res.send('nHno');

});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id+' its the end');
});
