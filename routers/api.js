const express = require("express"),
      User    = require("../models/user"),
      passport   = require("passport"),
      router  = express.Router();

// login POST route
router.post("/api/login",
passport.authenticate("local",{
  failureRedirect: "/login"
}), (req, res) => { return res.redirect("/")});

// logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// GET all user data
router.get("/api/users", async (req, res) => {
    try {
       const users = await User.find({});
       return res.send(users);
    } catch(err) {
        console.log(err.status);
        return res.sendStatus(500);
    }
});

// signup POST route
router.post("/api/signup", async (req, res) => {
  try {
      console.log(req.body);
    let newUser;
    if(req.body.type !== "store") {
      newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        gender:  "male",
      });
    } else {
      newUser = new User({
        username: req.body.username,
        storeName: req.body.storeName,
        address: req.body.address,
        userType: req.body.type,
        email: req.body.email,
        phone: req.body.phone,
        gender:  "male",
      });
    }
    
    const pass1 = req.body.password;
    const pass2 = req.body.password2;

    if(pass1 !== pass2) {
      console.log("Password not match");
      return res.sendStatus(500);
    }
    User.register(newUser, req.body.password, (err, user) => {
      if(err) {
        console.log(err.message);
        return res.sendStatus(500);
      }
      passport.authenticate("local")(req, res, () => { return res.sendStatus(200); });
    })
  } catch (error) {
    console.log(err.message);
    return res.status(500).send(error);
  }
});
module.exports = router;
