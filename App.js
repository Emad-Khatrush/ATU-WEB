if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express               = require('express'),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      session               = require("express-session"),
      passport              = require("passport"),
      localStrategy         = require("passport-local").Strategy,
      passportLocalMongoose = require("passport-local-mongoose"),
      app                   = express();

// require models
const User = require("./models/user");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:3000/atu-test';
// connect mongoose
mongoose.connect(dbUrl , {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) {
    console.log(err.message);
  } else {
    console.log("MongoDB connected");
  }
});
// passport configurations
app.use(session({
  secret: "ATU",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// require routers
const indexRoute = require("./routers/index"),
      authRoute  = require("./routers/auth"),
      authRoute  = require("./routers/api");

const port = process.env.PORT || 3000;

// configure packages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(async function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

//-------------------------------
//            Routes
//-------------------------------
app.use(indexRoute);
app.use(authRoute);


// local listener
app.listen(port, () => {
  console.log(`ATU app listening at http://localhost:${port}`);
})
