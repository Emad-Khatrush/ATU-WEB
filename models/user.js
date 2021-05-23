var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  storeName: String,
  email: String,
  address: String,
  phone: {type: Number, required: true},
  userType: {type: String, default: "buyer"},
  gender: {type: String, required: true},
  isAdmin: { type: Boolean, default: false },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);