const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    bookingDate: {type: Date, required: true},
    paymentDate: {type: Date, required: false},
    status: {type: String, required: true},
    nbPersons: {type: Number, required: true},
    premium: {type: Boolean, required: true},
    totalPrice: {type: Number, required: true},
    deleted: {type: Boolean, required: true, default: false},
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    housing: [{type: mongoose.Types.ObjectId, ref: "Housing", required: true}],
});

module.exports = mongoose.model("Booking", BookingSchema);