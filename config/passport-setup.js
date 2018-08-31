var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');

const model = require('../models/model');

passport.serializeUser((user,done)=>{
  done(null, user._id);
});

passport.deserializeUser((userId, done)=>{
  model.findById(userId).then((user)=>{
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret

      },(accessToken, refreshToken, profile, done)=>{
      //  console.log(profile);
        model.findOne({googleid: profile.id}).then((retrievedUser)=>{
          if(retrievedUser){
              console.log('user retrieved'+ retrievedUser);
              done(null,retrievedUser);
          }
          else{
            new model({
              username: profile.displayName,
              googleid: profile.id,
              thumbnail: profile.photos[0].value
            }).save().then((newUser)=>{
              console.log('new user added'+newUser);
              done(null, newUser);
            });
          }
        });
    })
);
