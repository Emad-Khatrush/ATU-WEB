const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    offers: Array,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    model: String,
    images: [{
        fileName: String,
        url: String
    }],
    fuelType: String,
    gear: String,
    city: String,
    carYear: Number,
    motor: String,
    carState: String,
    message: String
});

module.exports = mongoose.model("Post", postSchema);