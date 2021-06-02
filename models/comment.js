const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    storeId: String,
    createdAt: Date,
    updatedAt: Date,
    like: { type: Number, default: 0 },
    comment: String
});

module.exports = mongoose.model("Comment", commentSchema);