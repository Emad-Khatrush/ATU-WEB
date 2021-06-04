const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
    createdOffer: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    price: Number,
    images: [{
        fileName: String,
        url: String
    }],
    message: String
});

module.exports = mongoose.model("Offer", offerSchema);