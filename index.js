const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport= require('passport');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

//set view engine
app.set('view engine','ejs');

app.use(cookieSession({
  maxAge : 24 * 60 * 60 * 1000,
  keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect tomongo db
mongoose.connect('mongodb://localhost:27017/oauth',{ useNewUrlParser: true},()=>{
  console.log("connected successfully");
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
  res.render('home',{user:req.user});
});

app.listen(3000,()=>{
  console.log('app now listening for requests on port 3000');
});
