const express = require("express"),
      router  = express.Router();

// index route
router.get("/", (req,res) => {
  res.render('./info/home');
});
router.get("/products", (req,res) => {
  res.render('./info/products');
});

module.exports = router;
