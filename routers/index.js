const express = require("express"),
      Product = require("../models/product"),
      User    = require("../models/user"),
      router  = express.Router();

// index route
router.get("/", (req, res) => {
  res.render('./info/home');
});
router.get("/products", async (req, res) => {
  const products = await Product.find({}).populate('user');
  res.render('./info/products', { products });
});
// Store Get route
router.get("/stores", async (req, res) => {
  const stores = await User.find({userType: "store"});
  res.render('./info/stores', { stores });
});
// Store profile Get route
router.get("/store/:id", async (req, res) => {
  const storeId = req.params.id;
  try {
    const foundedStore = await User.findOne({ _id: storeId });
    res.render('./info/store', { store: foundedStore });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
});

module.exports = router;
