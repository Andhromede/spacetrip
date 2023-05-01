const mongoose = require("mongoose");

const DestinationSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  deleted: { type: Boolean, required: true, default: false },
  activity: [{type: mongoose.Types.ObjectId, ref: "Activity"}],
});

module.exports = mongoose.model("Destination", DestinationSchema);
