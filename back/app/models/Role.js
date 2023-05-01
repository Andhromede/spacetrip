const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name: {type: String, required: true},
    deleted: {type: Boolean, required: true, default: false},
});

module.exports = mongoose.model("Role", RoleSchema);