const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: Object,
    price: Number,
    reviews: Number,
    comments: String
});

module.exports = mongoose.model("Product", productSchema);