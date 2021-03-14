const express = require("express"),
      router  = express.Router();

// index route
router.get("/login", (req,res) => {
  res.render('./auth/login');
});

module.exports = router;
