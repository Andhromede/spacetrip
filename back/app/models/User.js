const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: String,
    addAdress: String,
    city: String,
    zipCode: String,
    country: String,
    phone: String,
    avatar: String,
    isToken: String,
    isValidate: Boolean,
    resetLink: { data: String, default: '' },
    deleted: { type: Boolean, required: true, default: false},
    role: { type: mongoose.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);