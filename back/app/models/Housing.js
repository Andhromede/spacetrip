const mongoose = require("mongoose");

const HousingSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  nbrPersons: { type: Number, required: true },
  nbBed1: { type: Number, required: true },
  nbBed2: { type: Number, required: true },
  price: { type: Number, required: true },
  deleted: { type: Boolean, required: true, default: false },
  picture: [{ type: mongoose.Types.ObjectId, ref: "Picture", required: true }],
  destination: { type: mongoose.Types.ObjectId, ref: "Destination", required: true },
  booking: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  offers: { type: Number },
});

module.exports = mongoose.model("Housing", HousingSchema);
