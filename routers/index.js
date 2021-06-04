const express    = require("express"),
      Product    = require("../models/product"),
      User       = require("../models/user"),
      Comment    = require("../models/comment"),
      Post       = require("../models/post"),
      Offer      = require("../models/offer"),
      middleware = require("../middleware/index"),
      async      = require("async"),
      multer     = require('multer'),
      router     = express.Router();

const { storage, cloudinary } = require('../cloudinary');
const offer = require("../models/offer");
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

// addproduct GET route
router.get("/addproduct", middleware.isLogin, (req, res) => {
  res.render('./auth/addproduct');
});

// addproduct POST route
router.post("/addproduct", middleware.isLogin, upload.array("productImages"), async (req, res) => {
  try {
    const product = new Product({
      user: req.user,
      title: req.body.name,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
      kargoDay: req.body.kargoDay,
      price: req.body.price
    });
    if(req.files) {
      const images = req.files.map(file => { return { fileName: file.filename, url: file.path } });
      product.images = images;
    }
    await product.save();
    req.flash("Ürün başarıyla eklendi");
    res.redirect('/store/' + req.user._id);
  } catch (error) {
    req.flash("error", error.message)
    res.redirect('./auth/addproduct');
  }
});
router.get("/product/edit/:id", middleware.isLogin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId});
  res.render("./info/editProduct", { product });
});
router.put("/product/edit/:id", middleware.isLogin, upload.array("productImages"), async (req, res) => {
  const productId = req.params.id;
  var product = {
    title: req.body.name,
    description: req.body.description,
    category: req.body.category,
    stock: req.body.stock,
    kargoDay: req.body.kargoDay,
    price: req.body.price
  }
  try {
    const productUpdated = await Product.findOneAndUpdate({ _id: productId }, product);
    await productUpdated.save();
    req.flash("success", "Ürün bilgileri başarıyla güncellendi");
    res.redirect("/product/edit/" + productId);
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/product/edit/" + productId);
  }
})

// comment Post request
router.post("/comment/:storeId",middleware.isLogin, async (req, res) => {
  try {
    const date = new Date();
    const comment = new Comment({
      user: req.user,
      storeId: req.params.storeId,
      createdAt: date,
      updatedAt: date,
      comment: req.body.comment
    });
    await comment.save();
    req.flash("succuss", "Yorumunuz başarıyla eklendi");
    res.redirect("back");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("back");
  }
});

// userprofile GET route
router.get("/userprofile", middleware.isLogin, (req, res) => {
  res.render('./auth/userprofile');
});

// post GET route
router.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.render('./info/posts', { posts });
});

router.get("/addpost", middleware.isLogin, (req, res) => {
  res.render('./info/addpost');
});

router.post("/addpost", middleware.isLogin, upload.array("postImages"), async (req, res) => {
  const post = new Post({
    user: req.user,
    fuelType: req.body.fuelType,
    gear: req.body.gear,
    city: req.body.city,
    carYear: req.body.carYear,
    motor: req.body.motor,
    carState: req.body.carState,
    message: req.body.message,
    model: req.body.model
  });
  try {
    if(req.files) {
      const images = req.files.map(file => { return { fileName: file.filename, url: file.path } });
      post.images = images;
    }
    await post.save();
    res.redirect('/posts');
  } catch (error) {
    res.redirect('back');
  }
});

router.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({ _id : postId });
  res.render('./info/postDetails', { post });
});

router.get("/addoffer/:id",middleware.isLogin, (req, res) => {
  const postId = req.params.id;
  res.render("./info/addOffer", { postId });
});
router.post("/addoffer/:id", middleware.isLogin, upload.array("offerImages"), async (req, res) => {
  try {
  var offer = new Offer({
    createdOffer: req.user,
    post: req.params.id,
    price: req.body.price,
    message: req.body.message
  });
  if(req.files) {
    const images = req.files.map(file => { return { fileName: file.filename, url: file.path } });
    offer.images = images;
  }
  await offer.save();

  const post = await Post.findOne( { _id:  req.params.id } );
  post.offers.push(offer);
  await post.save();
    res.redirect("/post/" + req.params.id );
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/post/" + req.params.id);
  }
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
    description: req.body.description,
    maintenanceDate: req.body.maintenanceDate,
    carYear: req.body.carYear,
    carModel: req.body.carModel,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    website: req.body.website,
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
    const store = await User.findOne({ _id: storeId });
    const products = await Product.find({ user: storeId });
    const comments = await Comment.find({ storeId }).populate('user');

    const n = 4
    const dividedProducts = new Array(Math.ceil(products.length / n))
    .fill()
    .map(_ => products.splice(0, n))
    res.render('./info/store', { store, products: dividedProducts, comments });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
});

module.exports = router;
