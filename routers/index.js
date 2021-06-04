const express    = require("express"),
      Product    = require("../models/product"),
      User       = require("../models/user"),
      middleware = require("../middleware/index"),
      async      = require("async"),
      multer     = require('multer'),
      router     = express.Router();

const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });

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

// myprofile Get route
router.get("/myprofile", middleware.isLogin , async (req, res) => {
  res.render('./info/myprofile');
});

// edit profile PUT: route
router.put("/myprofile/edit", middleware.isLogin, upload.single("profileImage"), async (req, res) => {
  var user = {
    username: req.body.username,
    storeName: req.body.storeName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    description: req.body.description
  }
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: req.user._id }, user);
    if (req.file) {
      const image = { url: req.file.path, filename: req.file.filename }
      userUpdated.image = image;
    }
    await userUpdated.save();
    req.flash("success", "Bilgileri başarıyla güncellendi");
    console.log(userUpdated);
    res.redirect("/myprofile");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/myprofile");
  }
});
// edit profile password PUT: route
// Change Password: post
router.post("/myprofile/edit/password", middleware.isLogin, (req, res) => {
      if (req.body.newPassword1 === req.body.newPassword2) {
        async.waterfall([
           (done) => {
            User.findOne({username: req.user.username}, function(err,user){
              if (err) {
                req.flash("error", err.message);
                res.redirect("/myprofile");
              }
              user.setPassword(req.body.newPassword1, function(err){
                user.save(function(err) {
                  if (err) {
                    req.flash("error", err.message);
                    res.redirect("/myprofile");
                  }
                  req.login(user, function(err) {
                    if (err) {
                      req.flash("error", err.message);
                      res.redirect("/myprofile");
                    }
                    done(err, user);
                  });
                });
              })
              req.flash("success", "Password changed successfully");
              res.redirect("/myprofile");
            });
          }
        ])
    } else {
      req.flash("error", "Passwords do not match");
      res.redirect("/myprofile");
    }
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

router.get("/favoriler", (req,res) => {
  res.render('./info/favoriler');
});

module.exports = router;
