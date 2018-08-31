var router = require('express').Router();
const model_chat = require('../models/model_chat');
var middleware = (req,res,next)=>{
  if(!req.user){
    res.redirect('/auth/login');
  }else{
    next();
  }
}

router.get('/',middleware,(req,res)=>{
//  res.send('you are logged in<br>Welcome'+req.user.username);
  model_chat.find({}, function(err,data){
    res.render('profile', {user: req.user, data: data});
  });

});

module.exports = router;
