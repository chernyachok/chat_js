const express = require('express');
const authRoutes = require('./routes/auth-routes');
const config = require('./config/passport-setup');
const app = express();
const mongoose = require('./config/db');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require("passport");
const profileRoute = require('./routes/profile-routes');
const socket = require('socket.io');
const model_chat = require('./models/model_chat');

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoute);
app.use('/public', express.static('public'));
// create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});
var middleware = (req,res,next)=>{
  if(req.url=='/auth'){
    res.redirect('/auth/login');
  }else{
    next();
  }
};
app.use(middleware,(req,res)=>{
  res.locals.msg = 'msg local';
  res.render('404',{title:"sorry not found", url:req.originalUrl});
})
app.set('port', (process.env.PORT || 8000));
var server = app.listen(app.get('port'), () => {
    console.log('app now listening for requests on port ',app.get('port'),' localhost');
});



var io = socket(server);
io.on('connection', function(sockets){
  console.log('sockets running', sockets.id);

  sockets.on('chat', function(data){
      model_chat.findOne({}).limit(1).then(function(record){//////////
        model_chat.remove({_id:record._id}).then(function(){
          console.log(record.nick,' was deleted.');
          var mod = new model_chat({
            nick: data.handle,
            message: data.message,
            time_unix : data.date
          });

            mod.save().then(function(){
              model_chat.findOne({_id:mod._id}).then(function(record){
                io.sockets.emit('chat', record);
              });
            });//////////
        });
      });
  });
    sockets.on('typing', function(data){
      sockets.broadcast.emit('typing', data);
    });
});
