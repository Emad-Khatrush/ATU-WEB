const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  firstName: String,
  lastName: String,
  storeName: String,
  email: String,
  address: String,
  posts: Object,
  image: {
    url: String,
    fileName: String
  },
  maintenanceDate: Date,
  carYear: Number,
  carModel: String,
  phone: {type: Number, required: true},
  userType: {type: String, default: "buyer"},
  gender: String,
  isAdmin: { type: Boolean, default: false },
  description: String,
  images: Object,
  posts: Object,
  reviews: Number,
  comments: Object,
  facebook: String,
  instagram: String,
  website: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);