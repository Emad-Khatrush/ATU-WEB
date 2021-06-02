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

router.get("/favoriler", (req,res) => {
  res.render('./info/favoriler');
});

module.exports = router;
