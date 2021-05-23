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
      return res.redirect("/signup");
    }
    User.register(newUser, req.body.password, (err, user) => {
      if(err) {
        console.log(err.message);
        return res.redirect("/signup");
      }
      passport.authenticate("local")(req, res, () => { return res.status(200).send(res); });
    })
  } catch (error) {
    console.log(err.message);
    return res.status(404).send(error);
  }
});
module.exports = router;
