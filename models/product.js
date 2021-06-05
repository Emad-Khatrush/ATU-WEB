const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    stock: Number,
    kargoDay: Number,
    images: [{
        fileName: String,
        url: String
    }],
    price: Number,
    reviews: Number,
    comments: String
});

module.exports = mongoose.model("Product", productSchema);