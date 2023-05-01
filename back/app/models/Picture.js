const mongoose = require("mongoose");

const PictureSchema = mongoose.Schema({
    path: {type: String, unique: true, required: true},
    isMain: {type: Boolean, required: true, default: false},
    deleted: {type: Boolean, required: true, default: false},
});

module.exports = mongoose.model("Picture", PictureSchema);