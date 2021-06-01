const express = require("express"),
      User    = require("../models/user"),
      passport   = require("passport"),
      router  = express.Router();

// login GET route
router.get("/login", (req, res) => {
  res.render('./auth/login');
});
// addproduct GET route
router.get("/addproduct", (req, res) => {
  res.render('./auth/addproduct');
});
// login POST route
router.post("/login",

passport.authenticate("local",{
  failureRedirect: "/login",
  failureFlash: true
}),
(req, res) => { 
  return res.redirect("/");
});
// logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// signup GET route
router.get("/signup", (req, res) => {
  res.render('./auth/signup');
});

// signup POST route
router.post("/signup", async (req, res) => {
  try {
    let newUser, newStore;
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
        userType: req.body.type || "store",
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
      passport.authenticate("local")(req, res, () => { return res.redirect("/") });
    })
  } catch (error) {
    console.log(err.message);
    return res.redirect("/signup");
  }
});
module.exports = router;
