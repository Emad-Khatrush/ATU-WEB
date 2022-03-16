const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    product: {type: Object, required: true}
});

module.exports = mongoose.model("Favourite", favouriteSchema);