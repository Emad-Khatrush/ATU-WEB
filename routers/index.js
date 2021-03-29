const express = require("express"),
      router  = express.Router();

// index route
router.get("/", (req,res) => {
  res.render('./info/home');
});
// index route
router.get("/stores", (req,res) => {
  res.render('./info/stores');
});

module.exports = router;
