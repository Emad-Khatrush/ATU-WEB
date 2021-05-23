const express = require("express"),
      router  = express.Router();

// index route
router.get("/", (req, res) => {
  res.render('./info/home');
});
router.get("/products", (req, res) => {
  res.render('./info/products');
});
// index route
router.get("/stores", (req, res) => {
  res.render('./info/stores');
});
router.get("/profile", (req,res) => {
  res.render('./info/profile');
});

module.exports = router;
