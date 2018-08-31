var express = require('express');
var app = express();

app.listen(8000, function(){
  console.log('port 8000');
});
/*
app.use(function(req,res,next){
  if(req.url == '/test'){
    res.send('test page');
  }else{
    next();
  }
});


app.use(function(req,res,next){
  if(req.url == '/'){
    res.send('index page');
  }else{
    next();
  }
});


app.use(function(req,res,next){
  if(req.url == '/forbidden'){
    next(new Error('permission denied'));
  }else{
    next();
  }
});
app.use(function(req,res){
  res.status(404).sendFile(__dirname+'/notfound.html');
});

app.use(function(err,req,res,next){

  res.sendStatus( 403);
});
*/


app.get('/', function(req,res){

  res.send('index');
})
app.get('/about',function(req,res){
  res.send('about');
});
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(function(req,res){
  res.locals.msg= 'kurwasuka';
    res.status(404).render('404',{title:'sorry page not found'})
});
