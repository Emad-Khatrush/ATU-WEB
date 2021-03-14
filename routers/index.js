const express = require("express"),
      router  = express.Router();

// index route
router.get("/", (req,res) => {
  res.render('./info/home');
});

module.exports = router;
