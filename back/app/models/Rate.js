const mongoose = require("mongoose");

const RateSchema = mongoose.Schema({
    comment: {type: String, required: true},
    rate: {type: Number, required: true},
    rateDate: {type: Date, required: false, default: new Date()},
    title: {type: String, required: false},
    deleted: {type: Boolean, required: true, default: false},
    housing: {type: mongoose.Types.ObjectId, ref: "Housing", required: true},
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    isValable: { type: Boolean, required: true, default: false},
});

module.exports = mongoose.model("Rate", RateSchema);