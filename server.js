require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const {spawn} = require("child_process");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');



let {PythonShell} = require('python-shell');


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
console.log("hello");
console.log(process.env.CLIENT_ID);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/legalhandbook",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/index", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/index", function(req, res){
  var searchQuery = req.body.searchquery;

  var options = {
    mode: "text",
    pythonPath: 'python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath:__dirname,
    args: ['Constitution of USA' ]
      }

console.log(searchQuery);
let pyshell = new PythonShell('automation.py');

pyshell.send(searchQuery);

pyshell.on('message', function (message) {

  console.log(message);
});
pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
  });
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get('/auth/google/legalhandbook',

  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/index');
});

app.get("/register", function(req, res){
  res.render("register");
})
app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/index");
      });
    }
  });

});

app.get("/login", function(req, res){
  res.render("login");
});
app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

});



app.listen(3000, function(){
  console.log("Server is running on port 3000");

});
