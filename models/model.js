const mongoose = require('../config/db');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,

  },
  googleid:{
    type:String
  },
  thumbnail:{
    type: String
  }
});

module.exports= User =mongoose.model('user', userSchema);
