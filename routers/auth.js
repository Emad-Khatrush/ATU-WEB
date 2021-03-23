const express = require("express"),
      router  = express.Router();

// index route
router.get("/login", (req,res) => {
  res.render('./auth/login');
});
// index route
router.get("/signup", (req,res) => {
  res.render('./auth/signup');
});
// index route
router.get("/ürünlerlistesi", (req,res) => {
  res.render('./auth/ürünlerlistesi');
});


module.exports = router;
