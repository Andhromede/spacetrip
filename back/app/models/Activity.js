const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true},
  description: { type: String, required: true},
  deleted: { type: Boolean, required: true, default: false},
  picture: [{ type: mongoose.Types.ObjectId, ref: "Picture" }],
  destination: [{ type: mongoose.Types.ObjectId, ref: "Destination", required: true}],
});

module.exports = mongoose.model("Activity", ActivitySchema);
